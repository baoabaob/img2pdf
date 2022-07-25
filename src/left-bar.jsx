import { Button } from "@chakra-ui/react";
import { VStack, Heading } from "@chakra-ui/react";
import { Link, Route, Switch, useLocation } from "wouter";
export const LeftBar = ({groups}) => {
  const [location, setLocation] = useLocation();
  return (
    <VStack align="stretch">
      {groups.map((group) => (
        <>
          <Heading mx="3" key={group.key} size="xs">
            {group.name}
          </Heading>
          {group.items.map((item) => {
            const key = `/${group.key}/${item.key}`;
            return (
              <Button
                justifyContent="flex-start"
                fontWeight="normal"
                key={key}
                variant={location === key ? "solid" : "ghost"}
                onClick={() => setLocation(key)}
              >
                {item.name}
              </Button>
            );
          })}
        </>
      ))}
    </VStack>
  );
};
