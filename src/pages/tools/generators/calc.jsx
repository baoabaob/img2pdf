import { useMethods } from "react-use";
import React, { useReducer,useState,useRef} from "react";
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
} from "@chakra-ui/react";
import { func } from "prop-types";

const initialState = {
    data1: 2,
    data2: 0,
    kind: "plus",
    res: 0,
}

function calc(state){
    let d1 = state.data1;
    let d2 = state.data2;
    switch(state.kind){
        case "plus":   return d1 + d2; 
        case "minus":  return d1 - d2; 
        case "times":  return d1 * d2;
        case "divide": return d1 / d2;
        case "mod":    return d1 % d2;
    }
}

const createMethods = (state) => ({
    switchKind(kind){
        return{...state,kind};
    },
    getRes(){
            let res = calc(state);
            // console.log(res);
        return{...state,res:res};
    }
});

export default function calcGegeratorPage() {
    const [state,methods] = useMethods(createMethods,initialState);
    // const [state,calculate]= useState(initialState);
    const Data2 = useRef();
    const Data1 = useRef();

    const $TypeSelect = (
        <FormControl>
            <FormLabel>Type</FormLabel>
            <RadioGroup defaultValue='Itachi' onChange={methods.switchKind}>
                <HStack spacing='24px'>
                    <Radio value='plus'>+</Radio>
                    <Radio value='minus'>-</Radio>
                    <Radio value='times'>x</Radio>
                    <Radio value='divide'>/</Radio>
                    <Radio value='mod'>%</Radio>
                </HStack>
            </RadioGroup>
            <FormHelperText>Choose the type you want to calculate</FormHelperText>
        </FormControl>
    );
    const $NamespaceInput = (
        <FormControl>
            <FormLabel>Data</FormLabel>
            <Input placeholder='First data' 
                    size='md' 
                    type = "number"
                    ref = {Data1}
                    onChange={ () => {
                    state.data1 = Number(Data1.current.value);
                }}/>
            <Input placeholder='Second data'
                    size='md' 
                    type = "number"
                    ref = {Data2}
                    onChange={ () => {
                    state.data2 = Number(Data2.current.value);
                    // console.log(Data2.current.value)
                    }}/>
            <FormHelperText>Input the data you want to calculate</FormHelperText>
        </FormControl>
    );
    const $Calculate = (
        <Button onClick={methods.getRes}>Calculate</Button>
    );
    const $Result = (
        <FormControl>
            <FormLabel>Result</FormLabel>
            <Textarea
                readOnly
                value= {state.res}
                sx={{ fontFamily: "mono" }}
            ></Textarea>
            <FormHelperText>That's the answer</FormHelperText>
        </FormControl>
    );
    return (
        <VStack align="flex-start">
            {$TypeSelect}
            <Box h={3} />
            {$NamespaceInput}
            <Box h={2} />
            {/* {$test} */}
            {$Calculate}
            <Box h={2}/>
            {$Result}
        </VStack>
    );
}

// import { useMethods } from "react-use";
// import {
//     FormErrorMessage,
//     FormLabel,
//     FormControl,
//     Input,
//     Button,
//     Radio,
//     Stack,
//     RadioGroup,
//     Textarea,
//     Box,
//     Text,
//     ButtonGroup,
//     VStack,
//     HStack,
//     FormHelperText
// } from "@chakra-ui/react";

// export default function calcGegeratorPage() {
//     // const[state,method] = useMethods(createMethods, initialState);

//     const $TypeSelect = (
//         <FormControl>
//             <FormLabel>Type</FormLabel>
//             <RadioGroup defaultValue='Itachi'>
//                 <HStack spacing='24px'>
//                     <Radio value='plus'>+</Radio>
//                     <Radio value='minus'>-</Radio>
//                     <Radio value='times'>x</Radio>
//                     <Radio value='divide'>/</Radio>
//                     <Radio value='mod'>%</Radio>
//                 </HStack>
//             </RadioGroup>
//             <FormHelperText>Choose the type you want to calculate</FormHelperText>
//         </FormControl>
//     );
//     const $NamespaceInput = (
//         <FormControl>
//             <FormLabel>Data</FormLabel>
//             <Input placeholder='First data' size='md' id = "fir"/>
//             <Input placeholder='Second data' size='md' id = "sec"/>
//             <FormHelperText>Input the data you want to calculate</FormHelperText>
//         </FormControl>
//     );
//     const $Result = (
//         <FormControl>
//             <FormLabel>Result</FormLabel>
//             <Textarea
//                 readOnly
//                 value= "111"
//                 sx={{ fontFamily: "mono" }}
//             ></Textarea>
//             <FormHelperText>That's the answer</FormHelperText>
//         </FormControl>
//     );
//     return (
//         <VStack align="flex-start">
//             {$TypeSelect}
//             <Box h={3} />
//             {$NamespaceInput}
//             <Box h={3} />
//             {$Result}
//         </VStack>
//     );
// }