import * as Router from "koa-router";
import { Machine } from "../../entity/machine";
import { getManager, createConnection, getConnectionOptions } from "typeorm";
import { MachineDto } from "./machine-dto";

class MachineController {
  public async save(ctx: any, next: any) {
    const dto = new MachineDto();
    Object.assign(dto, ctx.request.body);

    const manager = getManager();

    const entity = manager.create(Machine);

    manager.merge(Machine, entity, dto);

    await manager.save(entity);

    ctx.response.status = 200;
    ctx.body = "Ok";

    await next();
  }

  public async get(ctx: any, next: any) {
    const manager = await getManager();

    const result = await manager
      .createQueryBuilder(Machine, "mach")
      .where("mach.isDeleted= :isDeleted", { isDeleted: false })
      .select(["mach.id", "mach.code", "mach.name"])
      .orderBy("mach.name")
      .getMany();

    ctx.body = result;
    await next();
  }

  public async getById(ctx: any, next: any) {
    const id = ctx.query.id;

    const manager = await getManager();

    const machine = await manager.findOne(Machine, id);

    if (!machine) {
      ctx.response.status = 400;
      ctx.body = "Kayıt Bulunamadı";

      return;
    }

    ctx.response.status = 200;
    ctx.body = machine;
    await next();
  }

  public async update(ctx: any, next: any) {
    const id = ctx.query.id;
    const body = ctx.request.body;

    const manager = await getManager();

    const machine = await manager.findOne(Machine, id);

    if (!machine) {
      ctx.response.status = 400;
      ctx.body = "Kayıt Bulunamadı";

      return;
    }

    machine.name = body.name;
    machine.code = body.code;

    await manager.save(machine);

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

const cntr = new MachineController();

const router = new Router();
const routePrefix = "/api/machine/";

router.post(routePrefix + "save", cntr.save);
router.get(routePrefix + "get", cntr.get);
router.put(routePrefix + "update", cntr.update);
router.delete(routePrefix + "delete", cntr.delete);

const machineRouters = router.routes();
export { machineRouters };
