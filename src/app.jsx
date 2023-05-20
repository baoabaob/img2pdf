import React, { Suspense } from "react";
import { Link, Route, Switch, useLocation } from "wouter";
import { LeftBar } from "./left-bar";
import { tools, routes } from "./routes";
import { VStack, HStack, Box, Heading, Divider } from "@chakra-ui/react";

function AppContainer({ children }) {
  return (
    <div className="w-screen h-screen">
      <div className="m-auto max-w-[1200px]">{children}</div>
    </div>
  );
}


export default function App() {
  const [location, setLocation] = useLocation();
  return (
    <Box w="100vw" h="100vh">
      <Box m="auto" maxWidth="1200px" h="100%">
        <HStack align="stretch" h="100%" p={3}>
          <Box w={60}>
            <LeftBar groups={tools} />
          </Box>
          <Divider my="5" orientation="vertical" />
          <VStack flexGrow="1">
            <Box>
              <Heading heading={4}>{routes[location]?.label}</Heading>
            </Box>
            <Box position="relative" w="100%" flexGrow="1">
              <Box
                position="absolute"
                top="0"
                bottom="0"
                left="0"
                right="0"
                overflow="hidden"
              >
                <Switch>
                  {Object.keys(routes).map((path) => {
                    const Component = routes[path].component;
                    return (
                      <Route path={path}>
                        <Suspense fallback={<p>loading...</p>}>
                          <Component />
                        </Suspense>
                      </Route>
                    );
                  })}
                </Switch>
              </Box>
            </Box>
          </VStack>
        </HStack>
      </Box>
    </Box>
  );

  const Content = (
    <div className="2xl:border h-full flex ">
      <div className="w-60 mr-2">
        <LeftBar groups={tools} />
      </div>
      <div className="flex-1 flex flex-col">
        <div className="mt-1 mb-4">
          <Heading heading={4}>{routes[location]?.label}</Heading>
        </div>
        <div className="relative w-full flex-1">
          <div className="absolute inset-0 overflow-hidden">
            <Switch>
              {Object.keys(routes).map((path) => {
                const Component = routes[path].component;
                return (
                  <Route path={path}>
                    <Suspense fallback={<p>loading...</p>}>
                      <Component />
                    </Suspense>
                  </Route>
                );
              })}
            </Switch>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <AppContainer>
      <div className="mx-6 h-screen py-6">{Content}</div>
    </AppContainer>
  );
}
