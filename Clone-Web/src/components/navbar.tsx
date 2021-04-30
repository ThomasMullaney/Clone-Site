import { Box, Flex, Link, Button, Heading } from "@chakra-ui/core";
import React from "react";
import NextLink from "next/link";
import { useLogoutMutation, useMeQuery } from "../generated/graphql"
import { isServer } from "../utils/isServer";
import {useRouter} from "next/router";



interface NavBarProps {}

export const Navbar: React.FC<NavBarProps> = ({}) => {
  const router = useRouter();
   const [{fetching: logoutFetching}, logout] = useLogoutMutation();
   const [{ data, fetching }] = useMeQuery({
       pause: isServer(),
      });

      let body = null;

      //data is loading
      if (fetching) {
        //user not logged in
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
        <Flex align="center">
          <NextLink href="/create-post">
            <Button as={Link} mr={4}>
              Create Post
            </Button>
          </NextLink>
            <Box mr={2}>Sup {data.me.username}</Box>
            <Button onClick={async () => { 
               await logout();
               router.reload()
              //  await apolloClient.resetStore();
            }}
              isLoading={logoutFetching}
               variant='link'
               >
                 logout
                 </Button>
        </Flex>
        );
      }

      return (
        <Flex  zIndex={1} position="sticky" top={0} bg="tan" p={4} align="center">
          <Flex flex={1} margin='auto' align="center" maxW={800}>
          <NextLink href='/'>
            <Link>
            <Heading>The Heading</Heading>
            </Link>
          </NextLink>
          <Box ml={"auto"}>{body}</Box>
          </Flex>
        </Flex>
      )
}


//<-----------------------------------------------------------------------------------------------------------------------------------
// interface NavBarProps {}

// export const Navbar: React.FC<NavBarProps> = ({}) => {
//   const router = useRouter();
//   const [logout, { loading: logoutFetching }] = useLogoutMutation();
//   // const [{fetching: logoutFetching}, logout] = useLogoutMutation()
//   const apolloClient = useApolloClient();
//   const { data, loading } = useMeQuery({
//    skip: isServer(),
//   });

//   let body = null;
  
//   // data is loading
//   if (loading) {
//     // user not logged in 
//   } else if (!data?.me) {
  //   body = (
  //     <>
  //       <NextLink href="/login">
  //         <Link color="white" mr={2}>
  //           login
  //         </Link>
  //       </NextLink>
  //       <NextLink href="/register">
  //         <Link color="white" mr={2}>
  //           register
  //         </Link>
  //       </NextLink>
  //     </>
  //   );
  //   //user is logged in
  // } else {
  //   body = (
  //   <Flex align="center">
  //     <NextLink href="/create-post">
  //       <Button as={Link} mr={4}>
  //         Create Post
  //       </Button>
  //     </NextLink>
  //       <Box mr={2}>Sup {data.me.username}</Box>
  //       <Button onClick={async () => { 
  //          await logout();
  //          await apolloClient.resetStore();
  //       }}
  //         isLoading={logoutFetching}
  //          variant='link'
  //          >
  //            logout
  //            </Button>
  //   </Flex>
  //   );
  // }

//   return (
//     <Flex position="sticky" zIndex={1} top={0} bg="tan" p={4}>
//       <Flex flex={1} m="auto" align="center" maxW={800}>
//         <NextLink href="/">
//           <Link>
//           <Heading>
//             LiReddit
//           </Heading>
//           </Link>
//         </NextLink>
//         <Box ml={"auto"}>{body}</Box>
//       </Flex>
//       <Box ml={"auto"}>{body}</Box>
//     </Flex>
//   );
// };
