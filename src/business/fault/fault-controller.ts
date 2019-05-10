import * as Router from "koa-router";
import { getManager } from "typeorm";
import { FaultAddDto } from "./fault-dto";
import { Fault } from "../../entity/fault";

class FaultController {
  public async save(ctx: any, next: any) {
    const dto = new FaultAddDto();
    Object.assign(dto, ctx.request.body);

    const manager = getManager();

    const entity = manager.create(Fault);

    manager.merge(Fault, entity, dto);

    entity.date = new Date();

    await manager.save(entity);

    ctx.response.status = 200;
    ctx.body = "Ok";

    await next();
  }

  public async get(ctx: any, next: any) {
    const manager = await getManager();

    const result = await manager
      .createQueryBuilder(Fault, "fault")
      .innerJoinAndSelect(
        "fault.machine",
        "machine",
        "machine.isDeleted = :isDeleted",
        { isDeleted: false }
      )
      .innerJoinAndSelect("fault.faultType", "faultType")
      .innerJoinAndSelect("fault.personnel", "personnel")
      .where("fault.isDeleted= :isDeleted", { isDeleted: false })
      .orderBy("fault.date", "DESC")
      .getMany();

    ctx.body = result;
    await next();
  }

  public async getLastFaults(ctx: any, next: any) {
    const manager = await getManager();

    const result = await manager
      .createQueryBuilder(Fault, "fault")
      .innerJoinAndSelect(
        "fault.machine",
        "machine",
        "machine.isDeleted = :isDeleted",
        { isDeleted: false }
      )
      .innerJoinAndSelect("fault.faultType", "faultType")
      .innerJoinAndSelect("fault.personnel", "personnel")
      .where("fault.isDeleted = true")
      .orderBy("fault.date", "DESC")
      .getMany();

    ctx.body = result;
    await next();
  }

  public async getById(ctx: any, next: any) {
    const id = ctx.query.id;

    const manager = await getManager();

    const fault = await manager.findOne(FaultAddDto, id);

    if (!fault) {
      ctx.response.status = 400;
      ctx.body = "Kayıt Bulunamadı";

      return;
    }

    ctx.response.status = 200;
    ctx.body = fault;
    await next();
  }

  public async delete(ctx: any, next: any) {
    const id = ctx.request.body.id;

    const manager = await getManager();

    const fault = await manager.findOne(Fault, id);

    if (!fault) {
      ctx.response.status = 400;
      ctx.body = "Kayıt Bulunamadı";

      return;
    }

    fault.isDeleted = true;

    ctx.response.status = 200;
    ctx.body = "Ok";
    await manager.save(fault);

    await next();
  }
}

const cntr = new FaultController();

const router = new Router();
const routePrefix = "/api/fault/";

router.post(routePrefix + "save", cntr.save);
router.get(routePrefix + "get", cntr.get);
router.get(routePrefix + "getLastFaults", cntr.getLastFaults);
router.put(routePrefix + "delete", cntr.delete);

const faultRouters = router.routes();
export { faultRouters };
