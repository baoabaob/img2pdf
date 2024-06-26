import React, { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { Button, VStack, Box, Text, Flex, Image, CloseButton, Spinner } from '@chakra-ui/react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import cv from "@techstark/opencv-js";

const App = () => {
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: 'image/*',
    onDrop: acceptedFiles => {
      setImages([...images, ...acceptedFiles.map(file => URL.createObjectURL(file))]);
    }
  });

  const processImages = async () => {
    setIsLoading(true);
    try {
      let processedImages = await Promise.all(images.map(async (src) => {
        let imgElement = document.createElement('img');
        imgElement.src = src;
        await new Promise((resolve) => {
          imgElement.onload = () => resolve();
        });

        let canvas = document.createElement('canvas');
        let ctx = canvas.getContext('2d');
        canvas.width = imgElement.width;
        canvas.height = imgElement.height;

        ctx.drawImage(imgElement, 0, 0, imgElement.width, imgElement.height);

        let img = cv.imread(canvas);
        const imgGray = new cv.Mat();
        cv.cvtColor(img, imgGray, cv.COLOR_BGR2GRAY);

        const imgBlurred = new cv.Mat();
        const kernelSize = new cv.Size(0, 0);
        const sigma = 15
        cv.GaussianBlur(imgGray, imgBlurred, kernelSize, sigma, sigma, cv.BORDER_DEFAULT);

        // 提高对比度
        const imgContrast = new cv.Mat();
        const alpha = 1.5; // 对比度因子，大于1时提高对比度
        const beta = 0;    // 亮度增量，根据需要调整
        cv.convertScaleAbs(imgGray, imgContrast, alpha, beta);

        const imgSharpened = new cv.Mat();
        const sharpenAlpha = 1.5; // 锐化强度
        const sharpenBeta = -0.5; // 与模糊图像权重的负值
        cv.addWeighted(imgContrast, sharpenAlpha, imgBlurred, sharpenBeta, 0, imgSharpened, -1);

        cv.imshow(canvas, imgSharpened);

        img.delete();
        imgGray.delete();
        imgBlurred.delete();
        imgContrast.delete();
        imgSharpened.delete();

        let processedSrc = canvas.toDataURL();
        return processedSrc;
      }));

      setImages(processedImages);
    } catch (error) {
      console.error('Image processing error:', error);
    } finally {
      setIsLoading(false);
    }
  };
  const generatePDF = async () => {
    setIsLoading(true);
    try {
      let doc = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4'
      });

      for (let i = 0; i < images.length; i++) {
        let imgElement = document.createElement('img');
        imgElement.src = images[i];
        imgElement.style.position = 'absolute';
        imgElement.style.left = '-9999px';
        imgElement.style.top = '-9999px';
        document.body.appendChild(imgElement);

        await new Promise((resolve) => {
          imgElement.onload = () => resolve();
        });

        // 在使用html2canvas时提高scale值
        let canvas = await html2canvas(imgElement, { backgroundColor: null, scale: 2 });

        // 根据图片的原始分辨率调整PDF中的图片大小
        let imgData = canvas.toDataURL('image/png');
        let imgWidth = canvas.width > doc.internal.pageSize.getWidth() ? doc.internal.pageSize.getWidth() : canvas.width / (canvas.width / doc.internal.pageSize.getWidth());
        let imgHeight = canvas.height * imgWidth / canvas.width;

        // Add image to PDF with adjusted size
        doc.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight, '', 'FAST');

        if (i < images.length - 1) {
          doc.addPage();
        }

        document.body.removeChild(imgElement);
      }

      // 在保存前提示用户输入文件名
      const defaultFileName = 'download.pdf'; // 默认文件名
      let fileName = prompt("请输入文件名:", defaultFileName);
      if (fileName) {
        // 如果用户点击了"确定"并输入了文件名，则使用用户输入的文件名保存PDF
        // 如果文件名不以.pdf结尾，自动添加
        if (!fileName.endsWith('.pdf')) {
          fileName += '.pdf';
        }
        doc.save(fileName);
      } else {
        // 如果用户点击了"取消"，则不保存文件
        console.log("PDF下载被取消。");
      }
    } catch (error) {
      console.error('PDF generation error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const removeImage = (src) => {
    setImages(images.filter(image => image !== src));
  };

  return (
    <VStack p={4}>
      <Box {...getRootProps()} border='2px dashed' borderColor={isDragActive ? 'teal.500' : 'gray.500'} p={4} borderRadius='base' w='full' textAlign='center'>
        <input {...getInputProps()} />
        {isDragActive ? (
          <Text>把图片拖动到这里 ...</Text>
        ) : (
          <Text>拖动或点击上传图片</Text>
        )}
      </Box>
      <Button onClick={processImages}>一键黑白&锐化</Button>
      <Button onClick={generatePDF}>生成PDF</Button>
      <Flex flexWrap='wrap' justifyContent='center'>
        {images.map((src, index) => (
          <Box position='relative' key={index} m={2}>
            <CloseButton position='absolute' right='-4px' top='-4px' onClick={() => removeImage(src)} />
            <Image src={src} boxSize='100px' objectFit='cover' />
          </Box>
        ))}
      </Flex>
      {isLoading && (
        <Spinner
          thickness="4px"
          speed="0.65s"
          emptyColor="gray.200"
          color="teal.500"
          size="xl"
        />
      )}
    </VStack>
  );
};

export default App;