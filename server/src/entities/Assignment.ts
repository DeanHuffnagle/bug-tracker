import { Field, Int, ObjectType } from 'type-graphql';
import { BaseEntity, Entity, PrimaryGeneratedColumn } from 'typeorm';

@ObjectType()
@Entity()
export class Assignment extends BaseEntity {
	//================================================================================
	//Columns
	//================================================================================
	@Field(() => Int)
	@PrimaryGeneratedColumn()
	id!: number;
}
