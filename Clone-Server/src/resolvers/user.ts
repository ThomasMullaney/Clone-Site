import { MyContext } from "src/types";
import argon2 from "argon2";
import {
  Arg,
  Ctx,
  Field,
  InputType,
  Mutation,
  ObjectType,
  Query,
  Resolver,
} from "type-graphql";
import { User } from "../../src/entities/User";
import {EntityManager} from "@mikro-orm/postgresql"


@InputType()
class UsernamePasswordInput {
  @Field()
  username: string;
  @Field()
  password: string;
}

@ObjectType()
class FieldError {
  @Field()
  field: string;
  @Field()
  message: string;
}

@ObjectType()
class UserResponse {
  @Field(() => [FieldError], { nullable: true })
  errors?: FieldError[];

  @Field(() => User, { nullable: true })
  user?: User;
}

@Resolver()
export class UserResolver {
  // me query "who is currently logged in"
  @Query(() => User, {nullable: true})
  async  me(
    @Ctx() {req, em}: MyContext
  ) {
    // you are not logged in 
    if (!req.session.userId) {
      return null
    }

    const user = await em.findOne(User, {id: req.session.userId});
    return user;
  }


  @Mutation(() => UserResponse)
  async register(
    @Arg("options") options: UsernamePasswordInput,
    @Ctx() { em, req }: MyContext
  ): Promise<UserResponse> {
    if (options.username.length <= 2) {
      return {
        errors: [
          {
            field: "username",
            message: "length must be greater than 2",
          },
        ],
      };
    }

    if (options.password.length <= 5) {
      return {
        errors: [
          {
            field: "password",
            message: "length must be greater than 5",
          },
        ],
      };
    }

    const hashedPassword = await argon2.hash(options.password);
    let user;
    // const user = em.create(User, {
    //   username: options.username,
    //   password: hashedPassword,
    // });
    try {
     const result = await (em as EntityManager)
     .createQueryBuilder(User)
     .getKnexQuery()
     .insert({
          username: options.username,
          password: hashedPassword,
          created_at: new Date(),
          updated_at: new Date(),
        })
        .returning("*");
        user = result[0];
    } catch (err) {
      // duplicate username error
      if (err.detail.includes("already exists")) {
        return {
          errors: [
            {
              field: "username",
              message: "username already taken",
            },
          ],
        };
      }
    }

    console.log("i am user: ", user)
    // user login after register
    // store user id session, setting cookie on user keeping them logged in.
    req.session.userId = user.id;

    return { user };
  }

  @Mutation(() => UserResponse)
  async login(
    @Arg("options") options: UsernamePasswordInput,
    @Ctx() { em, req }: MyContext
  ): Promise<UserResponse> {
    const user = await em.findOne(User, { username: options.username });
    if (!user) {
      return {
        errors: [
          {
            field: "username",
            message: "That username does not exist",
          },
        ],
      };
    }
    const valid = await argon2.verify(user.password, options.password);
    if (!valid) {
      return {
        errors: [
          {
            field: "password",
            message: "invalid password for user",
          },
        ],
      };
    }

    req.session.userId = user.id;

    return {
      user,
    };
  }
}
