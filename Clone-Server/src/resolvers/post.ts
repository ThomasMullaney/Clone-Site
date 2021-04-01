import { Post } from "../entities/Post";
import { MyContext } from "src/types";
import { Arg, Ctx, Int, Mutation, Query, Resolver } from "type-graphql";

// @InputType()
// class PostInput {
//     @Field()
//     title: string;
//     @Field()
//     text: string;
// }

// @ObjectType()
// class PaginatedPosts {
//     @Field(() => [Post])
//     posts: Post[];
//     @Field()
//     hasMore: boolean;
// }


@Resolver()
export class PostResolver {
// read
    @Query(() => [Post])
    posts(@Ctx() { em }: MyContext): Promise<Post[]> {
        return em.find(Post, {});
    }

    @Query(() => Post, {nullable: true})
    post(
        @Arg("id", () => Int) id: number,
        @Ctx() { em }: MyContext
        ): Promise<Post | null> {
        return em.findOne(Post, { id });
        
    }

// create
    @Mutation(() => Post, {nullable: true})
    async createPost(
        @Arg("title", () => String) title: String,
        @Ctx() { em }: MyContext
        ): Promise<Post> {
            const post = em.create(Post, {title})
        await em.persistAndFlush(post)
        return post;
    }
  
// update
    @Mutation(() => Post, {nullable: true})
    async updatePost(
        @Arg("id") id: number,
        @Arg("title", () => String, {nullable: true}) title: string,
        @Ctx() { em }: MyContext
    ): Promise<Post | null> {
        const post = await em.findOne(Post, {id});
        if (!post){
            return null
        } if (typeof title !== 'undefined') {
            post.title = title;
            await em.persistAndFlush(post);
        }
        return post;
    }
// delete  
    @Mutation(() => Boolean)
    async deletePost(
        @Arg("id") id: number,
        @Ctx() { em }: MyContext
    ): Promise<boolean> {   
        await em.nativeDelete(Post, { id });
        return true;
    }
} 
