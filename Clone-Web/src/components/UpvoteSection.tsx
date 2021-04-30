import React, { useState } from "react";
import { Flex, IconButton } from "@chakra-ui/core";
import {
  PostSnippetFragment,
  useVoteMutation,
} from "../generated/graphql";


interface UpvoteSectionProps {
  post: PostSnippetFragment;
}

// const updateAfterVote = (
//   value: number,
//   postId: number,
//   cache: ApolloCaceh<VoteMutation>
// ) => {
//   const data = cache.readFragment<{
//     id: number;
//     points: number;
//     voteStatus: number | null;
//   }>({
//     id: "Post:" + postId,
//     fragment: gql`
//       fragment _ on Post {
//         id 
//         points
//         voteStatus
//       }
//       `,
//   });
// }

export const UpvoteSection: React.FC<UpvoteSectionProps> = ({ post }) => {
  const [loadingState, setLoadingState] = useState<'upvote-loading' | "downvote-loading" | "not-loading" >('not-loading');
  const [, vote] = useVoteMutation();

  return (
    <Flex direction="column" justifyContent="center" alignItems="center" mr={4}>
      <IconButton
        onClick={async() => {
          if (post.voteStatus === 1) {
            return;
          }
          setLoadingState('upvote-loading')
          await vote({
           postId: post.id,
           value: 1,

          //  update: (cache) => updateAfterVote(1, post.id, cache)
          });
         setLoadingState('not-loading')
            }}
        variantColor={post.voteStatus === 1 ? "green" : undefined}
        isLoading={loadingState === 'upvote-loading'}
        aria-label="upvote post"
        icon="chevron-up"
        />
        {post.points}
        <IconButton
         onClick={async() => {
           if(post.voteStatus === -1) {
             return;
           }
          setLoadingState('downvote-loading')
          await vote({
            // variables: {
           postId: post.id,
           value: -1,
            // }
          });
          setLoadingState('not-loading')
            }}
          variantColor={post.voteStatus === -1 ? "red" : undefined}
          isLoading={loadingState === 'downvote-loading'}
          aria-label="downvote post" 
          icon="chevron-down" />
        </Flex>
  

  )}
          

