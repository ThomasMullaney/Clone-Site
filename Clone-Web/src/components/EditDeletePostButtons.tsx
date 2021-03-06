import { Box, IconButton } from "@chakra-ui/core";
import NextLink from "next/link";
import React from "react";
import { useDeletePostMutation, useMeQuery } from "../generated/graphql";



interface EditDeletePostButtonsProps {
    id: number; 
    creatorId: number;
}

export const EditDeletePostButtons: React.FC<EditDeletePostButtonsProps> = ({
    id, 
    creatorId
}) => {
    const [{ data: meData }] = useMeQuery();
    const [, deletePost] = useDeletePostMutation();

    if (meData?.me?.id !== creatorId) {
        return null;
    }

    return (
        <Box ml='auto'>
        <NextLink href="/post/edit/[id]" as={`/post/edit/${id}`}>
        <IconButton 
        ml='auto'
        icon="edit"
        aria-label="Edit Post"
        />
        </NextLink>
     
      <IconButton 
        ml='auto'
        icon="delete"
        aria-label="Delete Post"
        onClick={() => {
          deletePost({ id });
        }}
        />
        </Box>)}
