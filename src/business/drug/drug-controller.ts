import * as Router from "koa-router";
import { getManager } from "typeorm";
import { DrugDto } from "./drug-dto";
import { Drug } from "../../entity/drug";

class DrugController {
  public async save(ctx: any, next: any) {
    const dto = new DrugDto();
    Object.assign(dto, ctx.request.body);

    const manager = getManager();

    const entity = manager.create(Drug);

    manager.merge(Drug, entity, dto);

    await manager.save(entity);

    ctx.response.status = 200;
    ctx.body = "Ok";

    await next();
  }

  public async get(ctx: any, next: any) {
    const manager = await getManager();

    const result = await manager
      .createQueryBuilder(Drug, "drug")
      .where("drug.isDeleted= :isDeleted", { isDeleted: false })
      .select(["drug.id", "drug.expiredDate", "drug.name"])
      .getMany();

    ctx.body = result;
    await next();
  }

  public async delete(ctx: any, next: any) {
    const id = ctx.request.body.id;

    const manager = await getManager();

    const drug = await manager.findOne(Drug, id);

    if (!drug) {
      ctx.response.status = 400;
      ctx.body = "Kayıt Bulunamadı";

      return;
    }

    drug.isDeleted = true;

    ctx.response.status = 200;
    ctx.body = "Ok";
    await manager.save(drug);

    await next();
  }
}

const cntr = new DrugController();

const router = new Router();
const routePrefix = "/api/Drug/";

router.post(routePrefix + "save", cntr.save);
router.get(routePrefix + "get", cntr.get);
router.put(routePrefix + "delete", cntr.delete);

const drugRouters = router.routes();
export { drugRouters };
