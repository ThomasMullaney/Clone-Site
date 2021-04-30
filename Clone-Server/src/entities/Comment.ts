// import { Field, ObjectType } from "type-graphql";
// import { BaseEntity, Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
// import { Post } from "./Post";
// import { User } from "./User";

// @ObjectType()
// @Entity()
// export class Comment extends BaseEntity {
//     @Field() 
//     @PrimaryGeneratedColumn()
//     id!: number;

//     @Field(() => String)
//     @CreateDateColumn({ type: "timestamptz" })
//     createdAt: Date;

//     @Field(() => String)
//     @UpdateDateColumn({ type: "timestamptz" })
//     updatedAt: Date;

//     @Field()
//     @Column()
//     text!: string;

//     @Field()
//     @Column({ type: "int", default: 0 })
//     points!: number;

//     @Field()
//     @Column()
//     creatorId!: number;

//     @Field()
//     @Column()
//     postId!: number;

//     // @Field(() => User)
//     // @ManyToOne(() => User, (user) => user.comments, { onDelete: "CASCADE"})
//     // commentCreator: User;

//     @Field(() => Post)
//     @ManyToOne(() => Post, (post) => post.comments, { onDelete: "CASCADE"})
//     commentPost: Post;
// }