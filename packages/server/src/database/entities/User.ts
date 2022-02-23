import { Entity, Column, Index, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class User {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Index()
    @Column()
    email: string

    @Column()
    name: string

    @Column()
    password: string
}