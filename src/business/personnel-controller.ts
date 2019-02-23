import * as Router from 'koa-router';
import { Personnel } from "../entity/personnel";
import { getManager, createConnection, getConnectionOptions } from "typeorm";
import { PersonnelType } from '../const/const.enum';
import { PersonnelDto } from './personnel-dto';

class PersonnelController {

    public async save(ctx: any, next: any) {

        const dto = new PersonnelDto();
        Object.assign(dto, ctx.request.body);

        const manager = getManager();

        const entity = manager.create(Personnel);

        manager.merge(Personnel, entity, dto);

        await manager.save(entity);

        ctx.response.status = 200;
        ctx.body = "Ok";

        await next();
    }

    public async get(ctx: any, next: any) {
        const manager = await getManager();

        const result = await manager
            .createQueryBuilder(Personnel, "pers")
            .select(
                [
                    'pers.id',
                    'pers.code',
                    'pers.name',
                    'pers.type'
                ])
            .getMany();

        ctx.body = result;
        await next();
    }
}

const cntr = new PersonnelController();

const router = new Router();
const routePrefix = '/api/personnel/';

router.post(routePrefix + 'save', cntr.save);
router.get(routePrefix + 'get', cntr.get);

const personnelRouters = router.routes();
export { personnelRouters };