import 'reflect-metadata'
import {MikroORM} from '@mikro-orm/core'
// import { Posts } from './entities/Posts';
import mikroConfig from "./mikro-orm.config"
import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import { buildSchema } from 'type-graphql';
import { HelloResolver } from './resolvers/hello';
import { PostResolver } from './resolvers/post';
import { UserResolver } from './resolvers/UserResolver';
const main = async ()=>{
    
    // database
    const orm = await MikroORM.init(mikroConfig);
    await orm.getMigrator().up()
    
    // express 

    
    const app = express()

    // apollo server
    const apolloServer= new ApolloServer({
        schema: await buildSchema({
            resolvers: [HelloResolver,PostResolver, UserResolver],
            validate: false
        }),
        context: ()=> ({
            em: orm.em
        })
    })

    // middleware

    apolloServer.applyMiddleware({app})

    
    // routes
    app.get('/', (_,res)=>{
        res.status(200).json({
            status: 'success'
        })
    })


    app.listen(5000, ()=>{
        console.log(`server stared on http://localhost:5000`);
    })
        
}

main()