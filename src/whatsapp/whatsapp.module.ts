// src/whatsapp/whatsapp.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm'; // Importamos TypeOrmModule
import { WhatsAppService } from './whatsapp.service'; // Importamos el servicio WhatsApp
import { WhatsAppGateway } from './whatsapp.gateway'; // Importamos el gateway WebSocket
import { Contact } from './common/entities/contact.entity'; // Importamos la entidad Contact
import { Message } from './common/entities/message.entity'; // Importamos la entidad Message

@Module({
  imports: [
    // Registramos las entidades en TypeOrmModule
    TypeOrmModule.forFeature([Contact, Message]), // Esto permitirá la inyección de los repositorios
  ],
  providers: [WhatsAppGateway, WhatsAppService], // Proveemos el servicio y el gateway
})
export class WhatsAppModule {}
