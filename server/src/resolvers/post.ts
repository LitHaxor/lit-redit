import { MyContext } from "src/types";
import { Arg, Ctx, Int, Query, Resolver } from "type-graphql";
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
    @Query(()=> Posts, {nullable: true})
    post(
        @Arg('id',()=> Int) id: number,
        @Ctx() {em}: MyContext
    ):Promise<Posts | null>
    {
        return em.findOne(Posts,{id})
    }
}