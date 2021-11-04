import * as PDFDocument from 'pdfkit';
import { Injectable } from '@nestjs/common';
import { Order } from '../orders/entities/order.entity';

@Injectable()
export class PdfService {
  async generatePDF(order: Order): Promise<Buffer> {
    const pdfBuffer: Buffer = await new Promise((resolve) => {
      const doc = new PDFDocument({
        size: 'LETTER',
        bufferPages: true,
      });

      // customize your PDF document
      doc.text('Cliente', 100, 50);
      doc.text(`Nome: ${order.customer.name}`, 100, 70);
      doc.text(`E-mail: ${order.customer.email}`, 100, 90);
      doc.text(`CPF: ${order.customer.cpf}`, 100, 110);

      doc.text('Compra', 100, 150);
      doc.text(
        `Data: ${order.date.toLocaleDateString('pt-BR', { timeZone: 'UTC' })}`,
        100,
        170,
      );
      doc.text(`Pagamento: ${order.paymentMethod}`, 100, 190);

      doc.text('Produtos', 100, 220);
      let aux = 220;
      order.products.forEach((produto) => {
        doc.text(`Nome: ${produto.name}`, 100, aux + 20);
        doc.text(`Tamanho: ${produto.size}`, 100, aux + 40);
        doc.text(`Preço: R$${produto.price}`, 100, aux + 60);
        aux += 60;
      });

      doc.text(
        `Total: ${order.products.reduce((total, product) => {
          return total + product.price;
        }, 0)}`,
        100,
        aux + 20,
      );

      doc.end();

      const buffer = [];
      doc.on('data', buffer.push.bind(buffer));
      doc.on('end', () => {
        const data = Buffer.concat(buffer);
        resolve(data);
      });
    });

    return pdfBuffer;
  }
}
