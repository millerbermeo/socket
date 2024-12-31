import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateContactDto } from './dto/create-contact.dto';
import { UpdateContactDto } from './dto/update-contact.dto';
import { Contact } from 'src/whatsapp/common/entities/contact.entity';

@Injectable()
export class ContactsService {
  constructor(
    @InjectRepository(Contact)
    private contactsRepository: Repository<Contact>,
  ) {}

  async create(createContactDto: CreateContactDto) {
    const contact = this.contactsRepository.create(createContactDto);
    return await this.contactsRepository.save(contact);
  }

  async findAll() {
    return await this.contactsRepository.find();
  }

  async findOne(id: number) {
    return await this.contactsRepository.findOne({ where: { id } });
  }

  async update(id: number, updateContactDto: UpdateContactDto) {
    await this.contactsRepository.update(id, updateContactDto);
    return await this.findOne(id);
  }

  async remove(id: number) {
    const contact = await this.findOne(id);
    if (contact) {
      await this.contactsRepository.remove(contact);
      return { message: `Contact with id ${id} has been removed.` };
    }
    return { message: `Contact with id ${id} not found.` };
  }
}
