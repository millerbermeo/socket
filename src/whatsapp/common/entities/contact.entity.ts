import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Message } from "./message.entity";

@Entity()
export class Contact {

    @PrimaryGeneratedColumn()
    id: number

    @Column({ unique: true })
    phoneNumber: string

    @Column({ type: 'varchar', length: 100 })
    public name: string;

    @OneToMany(() => Message, (message) => message.contact)
    messages: Message[]

    @Column({
        type: 'timestamp',
        default: () => 'CURRENT_TIMESTAMP',
        nullable: true,
    })
    public createdAt: Date;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
    updatedAt: Date;
}