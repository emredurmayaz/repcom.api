import * as Router from "koa-router";
import { Machine } from "../../entity/machine";
import { getManager } from "typeorm";
import { FaultDto } from "./fault-dto";

class FaultController {
  public async save(ctx: any, next: any) {
    const dto = new FaultDto();
    Object.assign(dto, ctx.request.body);

    const manager = getManager();

    const entity = manager.create(FaultDto);

    manager.merge(FaultDto, entity, dto);

    await manager.save(entity);

    ctx.response.status = 200;
    ctx.body = "Ok";

    await next();
  }

  public async get(ctx: any, next: any) {
    const manager = await getManager();

    const result = await manager
      .createQueryBuilder(FaultDto, "fault")
      .where("pers.isDeleted= :isDeleted", { isDeleted: false })
      .select(["mach.id", "mach.date", "mach.priority"])
      .getMany();

    ctx.body = result;
    await next();
  }

  public async getById(ctx: any, next: any) {
    const id = ctx.query.id;

    const manager = await getManager();

    const fault = await manager.findOne(FaultDto, id);

    if (!fault) {
      ctx.response.status = 400;
      ctx.body = "Kayıt Bulunamadı";

      return;
    }

    ctx.response.status = 200;
    ctx.body = fault;
    await next();
  }

  public async update(ctx: any, next: any) {
    const id = ctx.query.id;
    const body = ctx.request.body;

    const manager = await getManager();

    const fault = await manager.findOne(FaultDto, id);

    if (!fault) {
      ctx.response.status = 400;
      ctx.body = "Kayıt Bulunamadı";

      return;
    }

    fault.name = body.name;

    await manager.save(fault);

    ctx.response.status = 200;
    ctx.body = "Ok";
    await next();
  }
  public async delete(ctx: any, next: any) {
    const id = ctx.query.id;

    const manager = await getManager();

    const machine = await manager.findOne(Machine, id);

    if (!machine) {
      ctx.response.status = 400;
      ctx.body = "Kayıt Bulunamadı";

      return;
    }

    machine.isDeleted = true;

    ctx.response.status = 200;
    ctx.body = "Ok";
    await manager.save(machine);

    await next();
  }
}

const cntr = new FaultController();

const router = new Router();
const routePrefix = "/api/fault/";

router.post(routePrefix + "save", cntr.save);
router.get(routePrefix + "get", cntr.get);
router.put(routePrefix + "update", cntr.update);
router.delete(routePrefix + "delete", cntr.delete);

const faultRouters = router.routes();
export { faultRouters };
