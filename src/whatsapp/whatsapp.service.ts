// src/whatsapp/whatsapp.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Contact } from './common/entities/contact.entity';
import { Message } from './common/entities/message.entity';

@Injectable()
export class WhatsAppService {
  constructor(
    @InjectRepository(Contact)
    private contactRepository: Repository<Contact>,
    @InjectRepository(Message)
    private messageRepository: Repository<Message>,
  ) {}

  // Guardar mensaje para un contacto específico
  async saveMessage(body: string, direction: 'in' | 'out', phoneNumber: string) {
    let contact = await this.contactRepository.findOne({ where: { phoneNumber } });

    if (!contact) {
      // Si el contacto no existe, crear uno nuevo
      contact = new Contact();
      contact.phoneNumber = phoneNumber;
      await this.contactRepository.save(contact);
    }

    const message = new Message();
    message.body = body;
    message.direction = direction;
    message.contact = contact;

    await this.messageRepository.save(message);
  }

  // Obtener mensajes de un contacto
  async getMessages(phoneNumber: string) {
    const contact = await this.contactRepository.findOne({ where: { phoneNumber }, relations: ['messages'] });
    return contact ? contact.messages : [];
  }
}
