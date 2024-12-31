import {
  WebSocketGateway,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  MessageBody,
  ConnectedSocket,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { WhatsAppService } from './whatsapp.service';

@WebSocketGateway(3001, {
  transports: ['websocket', 'polling'],
  cors: {
    origin: 'http://localhost:5173', // Cambia esto al origen de tu frontend
    credentials: true,
  },
})
export class WhatsAppGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer() server: Server;

  constructor(private readonly whatsappService: WhatsAppService) {}

  handleConnection(client: Socket) {
    console.log(`Cliente conectado: ${client.id}`);
  }

  handleDisconnect(client: Socket) {
    console.log(`Cliente desconectado: ${client.id}`);
  }

  @SubscribeMessage('send_message')
  async handleSendMessage(
    @MessageBody() { phoneNumber, body }: { phoneNumber: string; body: string },
    @ConnectedSocket() client: Socket,
  ) {
    console.log('Mensaje recibido', { phoneNumber, body });
    await this.whatsappService.saveMessage(body, 'out', phoneNumber);
    this.server.emit('message', { phoneNumber, body });
  }

  @SubscribeMessage('get_messages')
  async handleGetMessages(@MessageBody() phoneNumber: string, @ConnectedSocket() client: Socket) {
    const messages = await this.whatsappService.getMessages(phoneNumber);
    client.emit('messages', messages);
  }
}
