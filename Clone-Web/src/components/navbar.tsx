import { Box, Flex, Link } from "@chakra-ui/core";

import React from "react";
import NextLink from "next/link";
import { useLogoutMutation, useMeQuery } from "../generated/graphql"
import { Button } from "@chakra-ui/react";
import { isServer } from "../utils/isServer";

interface NavBarProps {}

export const Navbar: React.FC<NavBarProps> = ({}) => {
  const [{fetching: logoutFetching}, logout] = useLogoutMutation()
  const [{ data, fetching }] = useMeQuery({
    pause: isServer(),
  });
  let body = null;
  // data is loading
  if (fetching) {
    // user not logged in 
  } else if (!data?.me) {
    body = (
      <>
        <NextLink href="/login">
          <Link color="white" mr={2}>
            login
          </Link>
        </NextLink>
        <NextLink href="/register">
          <Link color="white" mr={2}>
            register
          </Link>
        </NextLink>
      </>
    );
    //user is logged in
  } else {
    body = (
    <Flex>
        <Box mr={2}>Sup {data.me.username}</Box>
        <Button onClick={() => { logout();}} isLoading={logoutFetching} variant='link'>logout</Button>
    </Flex>
    );
  }
  return (
    <Flex bg="tan" p={4}>
      <Box ml={"auto"}>{body}</Box>
    </Flex>
  );
};
