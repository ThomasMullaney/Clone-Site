import {
  Box,
  Button,
  Flex,
  Heading,
  Link,
  Stack,
  Text,
} from "@chakra-ui/core";
import { withUrqlClient } from "next-urql";
import NextLink from "next/link";
import React, { useState } from "react";
import { EditDeletePostButtons } from "../components/EditDeletePostButtons";
import { Layout } from "../components/Layout";
import { UpvoteSection } from "../components/UpvoteSection";
import { usePostsQuery } from "../generated/graphql";
import { createUrqlClient } from "../utils/createUrqlClient";
// import { withApollo } from "../utils/withApollo";



const Index = () => {
  const [variables, setVariables] = useState({
     limit: 10, 
     cursor: null as null | string
    });

  const [{data, error, fetching}] = usePostsQuery({
    variables,
  });

  if (!fetching && !data) {
    return <div> Query failed
      <div>{error?.message}</div>
    </div>
  }

  return (
    <Layout>
      <Flex align='center'>
        <Heading> HEADER AREA</Heading>
      </Flex>
      <br />
      {!data && fetching ? (
        <div>Loading...</div>
      ) : (
        <Stack spacing={8}>
          {data!.posts.posts.map((p) =>
          !p ? null : (
            <Flex key={p.id} p={5} shadow="md" borderWidth="1px">
            <UpvoteSection post={p} />
            <Box flex={1}>
              <NextLink href="/post/[id]" as={`/post/${p.id}`}>
                <Link>
                  <Heading fontSize='xl'>{p.title}</Heading>
                </Link>
              </NextLink>
              <Text>posted by {p.creator.username}</Text>
              <Flex align='center'>
              <Text flex={1} mt={4}>{p.textSnippet}</Text>
              <Box ml='auto'>
                  <EditDeletePostButtons id={p.id} creatorId={p.creator.id}/>
                </Box>
                </Flex>
            </Box>
            </Flex>
          )
          )}
        </Stack>
  )}
  {data && data.posts.hasMore? ( 
  <Flex>
    <Button 
    onClick={() => {
      setVariables({
        limit: variables.limit,
        cursor: data.posts.posts[data.posts.posts.length -1 ].createdAt,
      })
    }}
    
    isLoading={fetching} my={8} m='auto'>Load More</Button>
    </Flex>
  ): null}
   </Layout>
  );
}

  


export default withUrqlClient(createUrqlClient, { ssr: true})(Index)

// <----------------------------------------------------------------------------------------------------finish
// const Index = () => {
//   const { data, error, loading, fetchMore, variables } = usePostsQuery({
//     variables: {
//       limit: 15,
//       cursor: null,
//     },
//     notifyOnNetworkStatusChange: true,
//   });

//   if (!loading && !data) {
//     return (
//       <div>
//         <div>query failed for some reason</div>
//         <div>{error?.message}</div>
//       </div>
//     );
//   }

//   return (
//     <Layout>
//       {!data && loading ? (
//         <div>loading...</div>
//       ) : (
//         <Stack spacing={8}>
//           {data!.posts.posts.map((p) =>
//             !p ? null : (
//               <Flex key={p.id} p={5} shadow="md" borderWidth="1px">
//                 <UpvoteSection post={p} />
//                 <Box flex={1}>
//                   <NextLink href="/post/[id]" as={`/post/${p.id}`}>
//                     <Link>
//                       <Heading fontSize="xl">{p.title}</Heading>
//                     </Link>
//                   </NextLink>
//                   <Text> posted by {p.creator.username}</Text>
//                   <Flex align="center">
//                     <Text flex={1} mt={4}>
//                       {p.textSnippet}
//                     </Text>
//                     <Box ml="auto">
//                       <EditDeletePostButtons
//                         id={p.id}
//                         creatorId={p.creator.id}
//                       />
//                     </Box>
//                   </Flex>
//                 </Box>
//               </Flex>
//             )
//           )}
//         </Stack>
//       )}
//       {data && data.posts.hasMore ? (
//         <Flex>
//           <Button
//             onClick={() => {
//               fetchMore({
//                 variables: {
//                   limit: variables?.limit,
//                   cursor:
//                     data.posts.posts[data.posts.posts.length - 1].createdAt,
//                 },
//                 // updateQuery: (
//                 //   previousValue,
//                 //   { fetchMoreResult }
//                 // ): PostsQuery => {
//                 //   if (!fetchMoreResult) {
//                 //     return previousValue as PostsQuery;
//                 //   }

//                 //   return {
//                 //     __typename: "Query",
//                 //     posts: {
//                 //       __typename: "PaginatedPosts",
//                 //       hasMore: (fetchMoreResult as PostsQuery).posts.hasMore,
//                 //       posts: [
//                 //         ...(previousValue as PostsQuery).posts.posts,
//                 //         ...(fetchMoreResult as PostsQuery).posts.posts,
//                 //       ],
//                 //     },
//                 //   };
//                 // },
//               });
//             }}
//             isLoading={loading}
//             m="auto"
//             my={8}
//           >
//             Load More
//           </Button>
//         </Flex>
//       ) : null}
//     </Layout>
//   );
// };
// export default withUrqlClient(createUrqlClient,{ ssr: true })(Index);
