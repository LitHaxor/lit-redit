import { User } from "../entities/User";
import { MyContext } from "../types";
import {  Arg, Ctx, Field, Mutation, ObjectType, Query, Resolver } from "type-graphql";
import  argon2 from 'argon2';

@ObjectType()
class FieldError{
    @Field()
    field: string;


    @Field()
    message: string;
}


@ObjectType()
class UserResponse{
    @Field(()=>[FieldError], {nullable:true})
    errors?: FieldError[]

    @Field(()=> User, {nullable: true})
    user?: User
}


@Resolver()
export class UserResolver{
   @Query(()=> User, {nullable: true})
   async user(
       @Arg('id')id: number,
       @Ctx() {em}: MyContext
   ):Promise<User| null>{
       const user= await em.findOne(User,{id});
       return user ? user : null;
   }
   // post user
   @Mutation(()=> UserResponse)
   async register(
       @Arg('username') username: string,
       @Arg('password') password: string,
       @Ctx() {em}:MyContext
   ): Promise<UserResponse>{
       const hashedPassword = await argon2.hash(password)
       const user = await em.create(User, {
           username: username, 
           password: hashedPassword
        });
        try {
            await em.persistAndFlush(user)
        } catch (error) {
           if(error.code === '23505' ){
                return {
                    errors:[
                        {
                            field: "username",
                            message: "username already exists"
                        }
                    ]
                }
           }
        }
       return {user};
   }

   // put user
   @Mutation(()=>User)
   async updateUser(
       @Arg('id') id: number,
       @Arg('password') password: string,
       @Ctx() {em}:MyContext
   ): Promise<User | null>{

       const user = await em.findOne(User, {id})
       if(!user)
        return null
       user.password = password;
       return user;
   }


   @Mutation(()=>UserResponse)
   async login(
       @Arg('username') username: string,
       @Arg('password') password: string,
       @Ctx() {em}:MyContext
   ): Promise<UserResponse >{
       if(username.length <= 0) 
       return {
           errors:[
                {
                    field: 'Empty username',
                    message: 'You must provide user name'
                }
           ]
       }
       if(password.length <= 0) 
       return {
           errors:[
                {
                    field: 'Empty password',
                    message: 'password field cannot be empty!'
                }
           ]
       }
       const user = await em.findOne(User, {username})
       if(!user){
           return {
               errors:[{
                field: 'username',
                message: 'username not exist'
               }]
           }
       }
       const isAuth = await argon2.verify(user.password,password);
       if(!isAuth) 
        return {
            errors:[{
                field: 'password',
                message: 'password did not match'
            }]
        }
        return {
            user: user
        }
    }
}
