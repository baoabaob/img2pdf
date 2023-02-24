import {useMethods} from "react-use";
import React, {useReducer, useState, useRef} from "react";
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
} from "@chakra-ui/react";
import {func} from "prop-types";

function base64strEncode(str) {
    return btoa(unescape(encodeURIComponent(str)));
}

function base64strDecode(str) {
    return decodeURIComponent(escape(atob(str)));
}

export default function base64strPage() {
    //可相互转换的字符串
    const [state, setState] = useState({
        str: "", base64str: "",
    });

    // 自适应文字的输入框
    const $str = (<FormControl>
            <FormLabel>Origin String</FormLabel>
            <HStack>
                <Textarea
                    resize="vertical"
                    value={state.str}
                    onChange={(e) => {
                        let str = e.target.value;
                        let base64str = base64strEncode(str);
                        setState({str, base64str});
                    }}/>
                <VStack direction={'column'}>
                    <Button size={'sm'} onClick={() => {
                        navigator.clipboard.writeText(state.str);
                    }}>Copy</Button>
                    <Button size={'sm'} onClick={() => {
                        navigator.clipboard.readText().then((text) => {
                            let str = text;
                            let base64str = base64strEncode(str);
                            setState({str, base64str});
                        });
                    }}>Paste</Button>
                </VStack>
            </HStack>
        </FormControl>);

    const $base64str = (<FormControl>
            <FormLabel>Base64 String</FormLabel>
            <div className="errorMess" style={{marginLeft: 10,marginBottom:5}}></div>
            <HStack>
                <Textarea
                    resize="vertical"
                    value={state.base64str}
                    onChange={(e) => {
                        let base64str = e.target.value;
                        let str;
                        let errorMessBox = document.getElementsByClassName("errorMess")[0];
                        try {
                            str = base64strDecode(base64str);
                            errorMessBox.innerText="";
                        } catch (e) {
                            errorMessBox.innerText="Be decoded is not correctly encoded.";
                        } finally {
                            setState({str, base64str});
                        }
                    }}/>
                <VStack direction={'column'}>
                    <Button size={'sm'} onClick={() => {
                        navigator.clipboard.writeText(state.base64str);
                    }}>Copy</Button>
                    <Button size={'sm'} onClick={() => {
                        navigator.clipboard.readText().then((text) => {
                            let base64str = text;
                            let str = base64strDecode(base64str);
                            setState({str, base64str});
                        });
                    }}>Paste</Button>
                </VStack>
            </HStack>
        </FormControl>);

    return (<VStack>
            {$str}
            {$base64str}
        </VStack>);
}