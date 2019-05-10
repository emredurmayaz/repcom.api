import * as Router from "koa-router";
import * as firebase from "firebase";
import {
  getManager,
  createConnection,
  getConnectionOptions,
  Entity
} from "typeorm";
import { Personnel } from "../../entity/personnel";
import { ApiResult } from "../../const/APIResult";

class PersonnelController {
  public async save(ctx: any, next: any) {
    const manager = getManager();
    const entity = manager.create(Personnel);

    manager.merge(Personnel, entity, ctx.request.body);

    const email = ctx.request.body.email;
    const password = ctx.request.body.password;
    const confirmPassword = ctx.request.body.confirmPassword;

    if (!email || !password || !confirmPassword) {
      ctx.status = 400;
      ctx.body = new ApiResult(null, "Email ve şifre boş geçilemez");
      return;
    }

    if (confirmPassword !== password) {
      ctx.status = 400;
      ctx.body = new ApiResult(null, "Şifre eşleştirmesi hatalı");
      return;
    }

    try {
      const firebasePersonnel = await firebase
        .auth()
        .createUserWithEmailAndPassword(email, password);

      if (firebasePersonnel) {
        entity.externalAuthId = firebasePersonnel.user.uid;
      }
    } catch (error) {
      ctx.status = 400;
      ctx.body = new ApiResult(null, error.message);
      return;
    }

    await manager.save(entity);

    ctx.response.status = 200;
    ctx.body = new ApiResult(entity.id, "Ok");

    await next();
  }

  public async get(ctx: any, next: any) {
    const manager = await getManager();

    const result = await manager
      .createQueryBuilder(Personnel, "pers")
      .where("pers.isDeleted= :isDeleted", { isDeleted: false })
      .select(["pers.id", "pers.code", "pers.name", "pers.type"])
      .getMany();

    ctx.body = result;
    await next();
  }

  public async getById(ctx: any, next: any) {
    const id = ctx.query.id;

    const manager = await getManager();

    const personnel = await manager.findOne(Personnel, id);

    if (!personnel) {
      ctx.response.status = 400;
      ctx.body = "Kayıt Bulunamadı";

      return;
    }

    ctx.response.status = 200;
    ctx.body = personnel;
    await next();
  }

  public async update(ctx: any, next: any) {
    const body = ctx.request.body;

    const manager = await getManager();

    const personnel = await manager.findOne(Personnel, body.id);

    if (!personnel) {
      ctx.response.status = 400;
      ctx.body = "Kayıt Bulunamadı";

      return;
    }

    personnel.name = body.name;
    personnel.code = body.code;
    personnel.type = body.type;

    await manager.save(personnel);

    ctx.response.status = 200;
    ctx.body = "Ok";
    await next();
  }

  public async delete(ctx: any, next: any) {
    const id = ctx.query.id;

    const manager = await getManager();

    const personnel = await manager.findOne(Personnel, id);

    if (!personnel) {
      ctx.response.status = 400;
      ctx.body = "Kayıt Bulunamadı";

      return;
    }

    personnel.isDeleted = true;

    ctx.response.status = 200;
    ctx.body = "Ok";
    await manager.save(personnel);

    await next();
  }
}

const cntr = new PersonnelController();

const router = new Router();
const routePrefix = "/api/personnel/";

router.post(routePrefix + "save", cntr.save);
router.get(routePrefix + "get", cntr.get);
router.put(routePrefix + "update", cntr.update);
router.delete(routePrefix + "delete", cntr.delete);

const personnelRouters = router.routes();
export { personnelRouters };
