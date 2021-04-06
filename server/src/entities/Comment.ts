import {
	Entity,
	Column,
	PrimaryGeneratedColumn,
	PrimaryColumn,
	CreateDateColumn,
	UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Comment {
	@PrimaryColumn()
	userId!: number;

	@PrimaryColumn()
	ticketId!: number;

	@Column()
	commentText!: string;

	@CreateDateColumn()
	createdAt: Date;

	@UpdateDateColumn()
	updatedAt: Date;
}
