import { __prod__ } from "./constants";
import { Posts } from "./entities/Posts";
import { MikroORM } from "@mikro-orm/core";
import path from "path";
export default {
    migrations: {
        path: path.join(__dirname,'./migrations'), 
        pattern: /^[\w-]+\d+\.ts$/,
    },
    entities:[Posts],
    type:'postgresql',
    dbName: 'litreddit',
    password: 'admin',
    debug: !__prod__,
} as Parameters<typeof MikroORM.init>[0];