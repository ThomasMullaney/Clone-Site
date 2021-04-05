import { MikroORM } from "@mikro-orm/core";
import "reflect-metadata";
import { COOKIE_NAME, __prod__ } from "./constants";
import microConfig from "./mikro-orm.config";
import express from "express";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import { HelloResolver } from "./resolvers/hello";
import { PostResolver } from "./resolvers/post";
import { UserResolver } from "./resolvers/user";
// import { Post } from "./entities/Post test";
import Redis from "ioredis";
import session from "express-session";
import connectRedis from "connect-redis";
import cors from "cors";
import { sendEmail } from "./utils/sendEmail";
import { User } from "./entities/User";

const main = async () => {
  sendEmail("bob@bob.com", "hello there")
  const orm = await MikroORM.init(microConfig);
  await orm.em.nativeDelete(User, {})
  await orm.getMigrator().up();

  const app = express();

  const RedisStore = connectRedis(session);
  const redis = new Redis();
  app.use(
    cors({
      origin: "http://localhost:3000",
      credentials: true,
    })
  );
  app.use(
    session({
      name: COOKIE_NAME,
      store: new RedisStore({
        client: redis,
        disableTouch: true,
      }),
      cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 365 * 8,
        httpOnly: true,
        sameSite: "lax", //csrf protection
        secure: __prod__, // cookie only works in https
      },
      saveUninitialized: false,
      secret: "ipeeintheshower",
      resave: false,
    })
  );

  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [HelloResolver, PostResolver, UserResolver],
      validate: false,
    }),
    context: ({ req, res }) => ({ em: orm.em, req, res, redis }),
  });

  apolloServer.applyMiddleware({
    app,
    cors: false,
  });

  app.listen(4000, () => {
    console.log(`app listening on localhost:4000`);
  });
};

main();
