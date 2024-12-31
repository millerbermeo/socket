import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Contact } from "./contact.entity";

@Entity()
export class Message {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    body: string

    @Column()
    direction: 'in' | 'out'


    @ManyToOne(()=> Contact, (contact) => contact.messages)
    contact: Contact
}