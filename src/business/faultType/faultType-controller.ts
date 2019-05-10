import * as Router from "koa-router";
import { getManager } from "typeorm";
import { FaultType } from "../../entity/faultType";
import { FaultTypeDto } from "./faultType-dto";

class FaultTypeController {
  public async save(ctx: any, next: any) {
    const dto = new FaultTypeDto();
    Object.assign(dto, ctx.request.body);

    const manager = getManager();

    const entity = manager.create(FaultType);

    manager.merge(FaultType, entity, dto);

    await manager.save(entity);

    ctx.response.status = 200;
    ctx.body = "Ok";

    await next();
  }

  public async get(ctx: any, next: any) {
    const manager = await getManager();

    const result = await manager
      .createQueryBuilder(FaultType, "faultTy")
      .where("faultTy.isDeleted= :isDeleted", { isDeleted: false })
      .select(["faultTy.id", "faultTy.code", "faultTy.name"])
      .getMany();

    ctx.body = result;
    await next();
  }

  public async getById(ctx: any, next: any) {
    const id = ctx.query.id;

    const manager = await getManager();

    const faultType = await manager.findOne(FaultType, id);

    if (!faultType) {
      ctx.response.status = 400;
      ctx.body = "Kayıt Bulunamadı";

      return;
    }

    ctx.response.status = 200;
    ctx.body = faultType;
    await next();
  }

  public async update(ctx: any, next: any) {
    const id = ctx.query.id;
    const body = ctx.request.body;

    const manager = await getManager();

    const faultType = await manager.findOne(FaultType, id);

    if (!faultType) {
      ctx.response.status = 400;
      ctx.body = "Kayıt Bulunamadı";

      return;
    }

    faultType.name = body.name;
    faultType.code = body.code;

    await manager.save(faultType);

    ctx.response.status = 200;
    ctx.body = "Ok";
    await next();
  }
  public async delete(ctx: any, next: any) {
    const id = ctx.query.id;

    const manager = await getManager();

    const faultType = await manager.findOne(FaultType, id);

    if (!faultType) {
      ctx.response.status = 400;
      ctx.body = "Kayıt Bulunamadı";

      return;
    }

    faultType.isDeleted = true;

    ctx.response.status = 200;
    ctx.body = "Ok";
    await manager.save(faultType);

    await next();
  }
}

const cntr = new FaultTypeController();

const router = new Router();
const routePrefix = "/api/faultType/";

router.post(routePrefix + "save", cntr.save);
router.get(routePrefix + "get", cntr.get);
router.put(routePrefix + "update", cntr.update);
router.delete(routePrefix + "delete", cntr.delete);

const faultTypeRouters = router.routes();
export { faultTypeRouters };
