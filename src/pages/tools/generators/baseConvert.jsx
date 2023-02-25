import React, {useState} from "react";
import {
    FormLabel,
    FormControl,
    Input,
    VStack,
} from "@chakra-ui/react"

function getValue(numberStr, singleValue) {
    numberStr = numberStr.toLowerCase();
    let value = 0;
    let HEX_Array = [{key: '0', val: 0}, {key: '1', val: 1}, {key: '2', val: 2}, {key: '3', val: 3}, {
        key: '4', val: 4
    }, {key: '5', val: 5}, {key: '6', val: 6}, {key: '7', val: 7}, {key: '8', val: 8}, {
        key: '9', val: 9
    }, {key: 'a', val: 10}, {key: 'b', val: 11}, {key: 'c', val: 12}, {key: 'd', val: 13}, {
        key: 'e', val: 14
    }, {key: 'f', val: 15},];
    for (let i = 0; i < numberStr.length; ++i) {
        for (let j = 0; j < HEX_Array.length; ++j) {
            if (numberStr.charAt(i) === HEX_Array[j].key) {
                value += HEX_Array[j].val * Math.pow(singleValue, numberStr.length - i - 1);
            }
        }
    }
    return value;
}

export default function baseConvertPage() {
    const [state, setState] = useState({
        HEX: '', DEC: '', OCT: '', BIN: ''
    });
    let errorMessBox = document.getElementsByClassName("errorMess");

    const $HEX = (<FormControl>
        <FormLabel>HEX</FormLabel>
        <div className="errorMess" style={{marginLeft: 10, marginBottom: 5}}></div>
        <Input placeholder='HEX'
               size='md'
               value={state.HEX}
               onChange={(e) => {
                   let HEX = e.target.value;
                   if (HEX === '') {
                       setState({HEX: '', DEC: '', OCT: '', BIN: ''});
                       errorMessBox[0].innerText = "";
                   } else if (HEX.match(/^[0-9a-f]*$/g) !== null) {
                       let value = getValue(HEX, 16);
                       let DEC = value.toString();
                       let OCT = value.toString(8);
                       let BIN = value.toString(2);
                       setState({HEX, DEC, OCT, BIN});
                       errorMessBox[0].innerText = "";
                   } else {
                       setState({HEX, DEC: '', OCT: '', BIN: ''});
                       errorMessBox[0].innerText = "Wrong Input";
                   }
               }}
        >
        </Input>
    </FormControl>)

    const $DEC = (<FormControl>
        <FormLabel>DEC</FormLabel>
        <div className="errorMess" style={{marginLeft: 10, marginBottom: 5}}></div>
        <Input placeholder='DEC'
               size='md'
               value={state.DEC}
               onChange={(e) => {
                   let DEC = e.target.value;
                   if (DEC === '') {
                       setState({HEX: '', DEC: '', OCT: '', BIN: ''});
                       errorMessBox[1].innerText = "";
                   } else if (DEC.match(/^[0-9]*$/g) !== null) {
                       let value = getValue(DEC, 10);
                       let HEX = value.toString(16);
                       let OCT = value.toString(8);
                       let BIN = value.toString(2);
                       setState({HEX, DEC, OCT, BIN});
                       errorMessBox[1].innerText = "";
                   } else {
                       setState({HEX: '', DEC, OCT: '', BIN: ''});
                       errorMessBox[1].innerText = "Wrong Input";
                   }
               }}
        >
        </Input>
    </FormControl>)

    const $OCT = (<FormControl>
        <FormLabel>OCT</FormLabel>
        <div className="errorMess" style={{marginLeft: 10, marginBottom: 5}}></div>
        <Input placeholder='OCT'
               size='md'
               value={state.OCT}
               onChange={(e) => {
                   let OCT = e.target.value;
                   if (OCT === '') {
                       setState({HEX: '', DEC: '', OCT: '', BIN: ''});
                       errorMessBox[2].innerText = "";
                   } else if (OCT.match(/^[0-7]*$/g) !== null) {
                       let value = getValue(OCT, 8);
                       let HEX = value.toString(16);
                       let DEC = value.toString();
                       let BIN = value.toString(2);
                       setState({HEX, DEC, OCT, BIN});
                       errorMessBox[2].innerText = "";
                   } else {
                       setState({HEX: '', DEC: '', OCT, BIN: ''});
                       errorMessBox[2].innerText = "WrongInput";
                   }
               }}
        >
        </Input>
    </FormControl>)

    const $BIN = (<FormControl>
        <FormLabel>BIN</FormLabel>
        <div className="errorMess" style={{marginLeft: 10, marginBottom: 5}}></div>
        <Input placeholder='BIN'
               size='md'
               value={state.BIN}
               onChange={(e) => {
                   let BIN = e.target.value;
                   if (BIN === "") {
                       setState({HEX: '', DEC: '', OCT: '', BIN});
                       errorMessBox[3].innerText = "";
                   } else if (BIN.match(/^[0-1]*$/g)) {
                       let value = getValue(BIN, 2);
                       let HEX = value.toString(16);
                       let DEC = value.toString();
                       let OCT = value.toString(8);
                       setState({HEX, DEC, OCT, BIN});
                       errorMessBox[3].innerText = "";
                   } else {
                       setState({HEX: '', DEC: '', OCT: '', BIN});
                       errorMessBox[3].innerText = "WrongInput";

                   }
               }}
        >
        </Input>
    </FormControl>)

    return (<VStack>
        {$HEX}
        {$DEC}
        {$OCT}
        {$BIN}
    </VStack>)
}