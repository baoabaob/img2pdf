import React, {useState} from "react";
import ReactDOM from "react-dom/client";
import {
    FormErrorMessage,
    FormLabel,
    FormControl,
    Input,
    Button,
    Radio,
    Stack,
    RadioGroup,
    Textarea,
    Box,
    Text,
    ButtonGroup,
    VStack,
    HStack,
    FormHelperText
} from "@chakra-ui/react"

export default function () {

    let [state, setState] = React.useState({
        regular: '', text: '', answer: ''
    });


    function checkRegular(regular, text) {
        let answer = '0 matches found:\n', errorMess = document.getElementsByClassName('errorMess')[0];
        try {
            let answerArrOld = text.match(eval('/' + regular + '/g')), answerArr = [];
            if (answerArrOld !== null) {
                answerArrOld.map((e) => {
                    if (e !== '' && e !== ' ') {
                        answerArr[answerArr.length] = e;
                    }
                })
                answer = answerArr.length + ' matches found:\n';
                answerArr.map((e) => {
                    answer += "    " + e + '\n';
                })
                errorMess.innerText = "";
            }
        } catch (e) {
            if (regular === "") {
                errorMess.innerText = "";
            } else {
                errorMess.innerText = "Wrong Regular";
            }
        }
        setState({
            regular, text, answer
        });

    }

    const $regularBox = (<FormControl>
        <FormLabel>Regular Box</FormLabel>
        <div className="errorMess" style={{marginLeft: 10, marginBottom: 5}}></div>
        <Input placeholder='regular'
               size='md'
               value={state.regular}
               onChange={(e) => {
                   checkRegular(e.target.value, state.text);
               }}
        >
        </Input>
    </FormControl>)


    const $textBox = (<FormControl>
        <FormLabel>Text Box</FormLabel>
        <Textarea
            resize="vertical"
            value={state.text}
            onChange={(e) => {
                checkRegular(state.regular, e.target.value);
            }}/>
    </FormControl>)

    const $answerBox = (<FormControl>
        <FormLabel>Answer Box</FormLabel>
        <Textarea
            resize="vertical"
            value={state.answer}
            height="350"
            onChange={() => {
            }}
        >
        </Textarea>
    </FormControl>)

    return (<VStack>
        {$regularBox}
        {$textBox}
        {$answerBox}
    </VStack>)
}