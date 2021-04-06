import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class DevTeam {
	@PrimaryGeneratedColumn()
	id: number;
}
