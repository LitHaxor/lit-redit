import {MikroORM} from '@mikro-orm/core'
import { Posts } from './entities/Posts';
import mikroConfig from "./mikro-orm.config"

const main = async ()=>{
    const orm = await MikroORM.init(mikroConfig);
    await orm.getMigrator().up()
    // const post = orm.em.create(Posts, {title: 'my First posts'})
    // await orm.em.persistAndFlush(post)

    // const posts = await orm.em.find(Posts, {});
        
}

main()