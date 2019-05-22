import * as Router from "koa-router";
import * as firebase from "firebase";
import { getManager } from "typeorm";
import { Personnel } from "../../entity/personnel";
import { ApiResult } from "../../const/APIResult";

const router = new Router();

const clientConfig = {
  apiKey: "AIzaSyBkk-DRS7YlshPplG7O85oFWeZ6rRSEA74",
  authDomain: "repcomapi.firebaseapp.com",
  databaseURL: "https://repcomapi.firebaseio.com",
  storageBucket: "repcomapi.appspot.com"
};

firebase.initializeApp(clientConfig);

async function authLogin(ctx: any, next: any) {
  const body = ctx.request.body;

  const email = body.email;
  const password = body.password;

  if (email === "" || password === "") {
    return (ctx.status = 400);
  }

  try {
    const firebaseUser = (await firebase
      .auth()
      .signInWithEmailAndPassword(email, password)).user;

    const token = await firebaseUser.getIdToken(true);
    //TOKEN DA PERSONEL ID DÖNÜLECEK

    const authUserId = await firebaseUser.uid;
    const manager = await getManager();

    const personnel = await manager
      .createQueryBuilder(Personnel, "personnel")
      .where("personnel.isDeleted = :isDeleted", { isDeleted: false })
      .andWhere("personnel.externalAuthId = :authId", { authId: authUserId })
      .select(["personnel.id", "personnel.name", "personnel.type"])
      .getOne();

    ctx.body = {
      token: token,
      personnelId: personnel.id,
      personnelName: personnel.name,
      personnelType: personnel.type
    };
  } catch (error) {
    ctx.status = 400;
    ctx.body = new ApiResult(null, error.message);
    return;
  }

  ctx.status = 200;
}

async function register(ctx: any, next: any) {
  const manager = getManager();
  const body = ctx.request.body;

  const email = body.email;
  const password = body.password;
  const confirmPassword = body.confirmPassword;

  if (email === "" || password === "" || confirmPassword === "") {
    return (ctx.status = 400);
  }

  if (confirmPassword !== password) {
    return (ctx.status = 400);
  }

  // let query = await manager
  //   .createQueryBuilder(Personnel, "pers")
  //   .where("pers.isDeleted= false")
  //   .andWhere("lower(pers.email)=lower('" + email + "')")
  //   .getQuery();

  // query = "select Exists (" + query + ")";
  // const checkPersonnel = (await manager.query(query))[0].exists;

  // if (checkPersonnel) {
  //   return (ctx.status = 400);
  // }

  const personnel = manager.create(Personnel);
  manager.merge(Personnel, personnel, ctx.request.body);

  try {
    const firebasePersonnel = await firebase
      .auth()
      .createUserWithEmailAndPassword(email, password);

    if (firebasePersonnel) {
      personnel.externalAuthId = firebasePersonnel.user.uid;
    }
  } catch (error) {
    ctx.status = 400;
    ctx.body = new ApiResult(null, error.message);
    return;
  }

  await manager.save(personnel);

  ctx.response.status = 200;
  ctx.body = new ApiResult(personnel.id, "Ok");
}

const authRouters = router.routes();
router.post("/login", authLogin);
router.post("/register", register);

export { authRouters };
