import { MyContext } from "src/types";
import { Arg, Ctx, Int, Mutation, Query, Resolver } from "type-graphql";
import { Posts } from "../entities/Posts";
@Resolver()
export class PostResolver{
    @Query(()=> [Posts])
    posts(
        @Ctx() {em}: MyContext
    ):Promise<Posts[]>
    {
        return em.find(Posts,{})
    }
    // get one
    @Query(()=> Posts, {nullable: true})
    post(
        @Arg('id',()=> Int) id: number,
        @Ctx() {em}: MyContext
    ):Promise<Posts | null>
    {
        return em.findOne(Posts,{id})
    }

    // Post, creating
    @Mutation(()=> Posts)
    async createPost (
        @Arg('title') title: string,
        @Ctx() {em}: MyContext
    ):Promise<Posts>
    {
        const post= em.create(Posts, {title});
        await em.persistAndFlush(post);
        return post;
    }

    // PUT/ update one post
    @Mutation(()=> Posts, {nullable: true})
    async updatePost (
        @Arg("id") id: number,
        @Arg('title',()=> String, {nullable:true}) title: string,
        @Ctx() {em}: MyContext
    ):Promise<Posts| null>
    {
        const post=await em.findOne(Posts, {id});
        if(!post){
            return null
        }
       if(typeof title !== 'undefined'){
           post.title = title;
           await em.persistAndFlush(post)
       }
        return post;
    }
    
}