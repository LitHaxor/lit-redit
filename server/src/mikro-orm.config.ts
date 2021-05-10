import { DB_URL, __prod__ } from "./constants";
import { Posts } from "./entities/Posts";
import { MikroORM } from "@mikro-orm/core";
import path from "path";
import { User } from "./entities/User";
export default {
    migrations: {
        path: path.join(__dirname,'./migrations'), 
        pattern: /^[\w-]+\d+\.ts$/,
    },
    entities:[Posts,User],
    type:'postgresql',
    clientUrl:DB_URL,
    dbName: "litreddit",
    debug: !__prod__,
} as Parameters<typeof MikroORM.init>[0];