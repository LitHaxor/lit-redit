import { Entity, PrimaryKey, Property } from "@mikro-orm/core";
import { ObjectType, Field, Int } from "type-graphql";

@ObjectType()
@Entity()
export class User {
    @Field(()=> Int)
    @PrimaryKey()
    id!: number;

    @Field(()=> Date)
    @Property({type: 'date'})
    createdAt= new Date();

    @Field(()=> Date)
    @Property({type:'date',onUpdate: ()=> new Date()})
    updatedAt = new Date();
    
    @Field(()=> String)
    @Property({type: "text", unique: true})
    username!: string;

    @Property({type: "text"})
    password!: string; 
    
}