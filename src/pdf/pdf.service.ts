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
      doc.text(`Cliente ${order.customer.name}`, 100, 50);
      doc.text(`Cliente ${order.customer.name}`, 100, 55);
      doc.text(`Cliente ${order.customer.name}`, 100, 60);
      doc.text(`Cliente ${order.customer.name}`, 100, 65);
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
