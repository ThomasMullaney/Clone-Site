import { ObjectType, Field, Int,  } from "type-graphql";
import {
  BaseEntity,
  Column,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  CreateDateColumn,
  ManyToOne,
  OneToMany,
} from "typeorm";
import { User } from "./User";
import { Upvote } from "./Upvote";

@ObjectType()
@Entity()
export class Post extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn()
  id!: number;

  @Field()
  @Column()
  title!: string;

  @Field()
  @Column()
  text!: string;

  @Field()
  @Column({ type: "int", default: 0 })
  points!: number;

  @Field(() => Int, { nullable: true})
  voteStatus: number | null; // 1 or -1 or null

  @Field()
  @Column()
  creatorId: number;

  // @Field(() => Comment)
  // @OneToMany(() => Comment, (comment) => comment.commentPost, {
  //   onDelete: "CASCADE",
  // })
  // comments: Comment[];

  @Field()
  @ManyToOne(() => User, (user) => user.posts)
  creator: User;

  @OneToMany(() => Upvote, (upvote) => upvote.post)
  upvotes: Upvote[];
  
  @Field(() => String)
  @CreateDateColumn()
  createdAt: Date;

  @Field(() => String)
  @UpdateDateColumn()
  updatedAt: Date;
}
