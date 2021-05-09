import { MyContext } from "src/types";
import { Ctx, Query, Resolver } from "type-graphql";
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
}