import * as Router from 'koa-router';
import { User } from "../entity/user";
import { getManager } from "typeorm";

class UserController {

    static async save(ctx: any, next: any) {

        console.log("this");
        const manager = getManager();

        const entity = new User();

        entity.firstName = "Anıl";
        entity.lastName = "Yıldırım";
        entity.age = 25;

        await manager.save(entity);

        ctx.response.status = 200;
        ctx.body = "Ok";

        await next();
    }
}

const router = new Router();
const routePrefix = '/api/user/';

router.get(routePrefix + 'save', UserController.save);

const userRouters = router.routes();
export { userRouters };