import { useMethods } from "react-use";
import * as uuid from "uuid";
import { nanoid } from "nanoid";

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

const initialState = {
  kind: "uuid_v4",
  generated: uuid.v4(),
  count: 1,
  namespace: "",
  namespaceError: null,
  name: "",
};

function isV3OrV5(state) {
  return state.kind === "uuid_v3" || state.kind === "uuid_v5";
}

function generateOne(state) {
  switch (state.kind) {
    case "uuid_v0":
      return uuid.NIL;
    case "uuid_v1":
      return uuid.v1().toUpperCase();

    case "uuid_v3":
      return uuid.v3(state.name, state.namespace || uuid.NIL).toUpperCase();
    case "uuid_v4":
      return uuid.v4().toUpperCase();
    case "uuid_v5":
      return uuid.v5(state.name, state.namespace || uuid.NIL).toUpperCase();
    case "nanoid":
      return nanoid();
  }
}

function generate(state) {
  if (isV3OrV5(state) && state.namespaceError) {
    return "";
  }
  const maxCount = isV3OrV5(state) || state.kind === "uuid_v0" ? 1 : 500;
  const count = Math.min(state.count, maxCount);
  return Array(count)
    .fill(null)
    .map((_) => generateOne(state))
    .join("\n");
}

const createMethods = (state) => ({
  switchKind(kind) {
    const withKindChanged = {
      ...state,
      kind,
    };
    return { ...withKindChanged, generated: generate(withKindChanged) };
  },
  triggerGenerate() {
    return { ...state, generated: generate(state) };
  },
  setNamespace(namespace) {
    return {
      ...state,
      namespace,
      namespaceError:
        uuid.validate(namespace) || namespace === "" ? null : "invalid UUID",
    };
  },
  setName(name) {
    return { ...state, name };
  },
  setCount(count) {
    if (count === "") {
      count = "0";
    }
    const v = parseInt(count, 10);
    if (v) {
      return { ...state, count: v };
    } else {
      return state;
    }
  },
});

export default function UUIDGeneratorPage() {
  const [state, methods] = useMethods(createMethods, initialState);

  const $TypeSelect = (
    <FormControl>
      <FormLabel>Type</FormLabel>
      <RadioGroup value={state.kind} onChange={methods.switchKind}>
        <Stack direction="row">
          <Radio value="uuid_v0">UUID v0</Radio>
          <Radio value="uuid_v1">UUID v1</Radio>
          <Radio value="uuid_v3">UUID v3</Radio>
          <Radio value="uuid_v4">UUID v4</Radio>
          <Radio value="uuid_v5">UUID v5</Radio>
          <Radio value="nanoid">Nano ID</Radio>
        </Stack>
      </RadioGroup>
    </FormControl>
  );
  const $NamespaceInput = (
    <FormControl isInvalid={state.namespaceError}>
      <FormLabel htmlFor="namespace">
        Namespace
        <ButtonGroup size="xs" variant="link" spacing="3" pl="3">
          <Button
            onClick={() =>
              methods.setNamespace("6ba7b810-9dad-11d1-80b4-00c04fd430c8")
            }
          >
            ns:DNS
          </Button>
          <Button
            onClick={() =>
              methods.setNamespace("6ba7b811-9dad-11d1-80b4-00c04fd430c8")
            }
          >
            ns:URL
          </Button>
          <Button
            onClick={() =>
              methods.setNamespace("6ba7b812-9dad-11d1-80b4-00c04fd430c8")
            }
          >
            ns:OID
          </Button>
          <Button onClick={() => methods.setNamespace("")} colorScheme="blue">
            clear
          </Button>
        </ButtonGroup>
      </FormLabel>
      <Input
        id="namespace"
        placeholder={uuid.NIL}
        value={state.namespace}
        onChange={(ev) => methods.setNamespace(ev.target.value)}
      />
      <FormErrorMessage>{state.namespaceError}</FormErrorMessage>
    </FormControl>
  );
  const $NameInput = (
    <FormControl>
      <FormLabel htmlFor="name">Name</FormLabel>
      <Input
        id="name"
        placeholder={uuid.NIL}
        value={state.name}
        onChange={(ev) => methods.setName(ev.target.value)}
      />
    </FormControl>
  );
  const $GenerateButtons = (
    <HStack>
      <Button w="32" onClick={methods.triggerGenerate}>
        Generate
      </Button>
      {!(isV3OrV5(state) || state.kind === "uuid_v0") && (
        <>
          <Text> x </Text>
          <Input
            w="24"
            id="count"
            placeholder={1}
            value={state.count}
            onChange={(ev) => methods.setCount(ev.target.value)}
          />
        </>
      )}
    </HStack>
  );
  const $GeneratedArea = (
    <>
      <FormControl>
        <FormLabel>Generated</FormLabel>
        <Textarea
          readOnly
          value={state.generated}
          sx={{ fontFamily: "mono" }}
        ></Textarea>
      </FormControl>
      <Button onClick={() => navigator.clipboard.writeText(state.generated)}>
        Copy
      </Button>
    </>
  );
  return (
    <VStack align="flex-start">
      {$TypeSelect}
      <Box h={1} />

      {isV3OrV5(state) && $NamespaceInput}
      {isV3OrV5(state) && $NameInput}
      <Box h={1} />
      {$GenerateButtons}
      <Box h={2} />
      {$GeneratedArea}
    </VStack>
  );
}
