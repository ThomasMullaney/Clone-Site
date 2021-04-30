import { ApolloServer } from "apollo-server-express";
import connectRedis from "connect-redis";
import cors from "cors";
import express from "express";
import session from "express-session";
import Redis from "ioredis";
import path from "path";
import "reflect-metadata";
import { buildSchema } from "type-graphql";
import { createConnection } from "typeorm";
import { COOKIE_NAME, __prod__ } from "./constants";
import { Post } from "./entities/Post";
import { Upvote } from "./entities/Upvote";
import { User } from "./entities/User";
import { HelloResolver } from "./resolvers/hello";
import { PostResolver } from "./resolvers/post";
import { UserResolver } from "./resolvers/user";
import { createUpvoteLoader } from "./utils/createUpvoteLoader";
import { createUserLoader } from "./utils/createUserLoader";
// import "dotenv-safe/config";

const main = async () => {
  const conn = await createConnection({
    type: "postgres",
    database: "testDB2",
    username: "postgres",
    password: "mrniceguy911",
    logging: true,
    synchronize: true,
    migrations: [path.join(__dirname, "./migrations/*")],
    entities: [Post, User, Upvote], //Upvote
  });
  await conn.runMigrations();

  // await Post.delete({})
  // await User.delete({})
  const app = express();

  const RedisStore = connectRedis(session);
  const redis = new Redis(); //process.env.REDIS_URL
  // app.set("trust proxy", 1);
  app.use(
    cors({
      origin: "http://localhost:3000", // process.env.COR_ORIGIN
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
        // domain: __prod__ ? ".codeponder.com" : undefined,
      },
      saveUninitialized: false,
      secret: "ipeeintheshower", //process.env.SESSION_SECRET,
      resave: false,
    })
  );

  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [HelloResolver, PostResolver, UserResolver],
      validate: false,
    }),
    context: ({ req, res }) => ({
      req,
      res,
      redis,
      userLoader: createUserLoader(),
      upvoteLoader: createUpvoteLoader(),
    }),
  });

  apolloServer.applyMiddleware({
    app,
    cors: false,
  });

  // app.listen(paresInt(process.env.PORT), () => {
  //   console.log("server started on localhost:4000")
  // });
  app.listen(4000, () => {
    console.log(`app listening on localhost:4000`);
  });
};

main().catch((err) => {
  console.error(err);
});
