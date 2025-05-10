import nodemailer from 'nodemailer';
import { Readable } from 'stream';

export const sendEmailWithAttachment = async (
  to: string,
  subject: string,
  text: string,
  filename: string,
  pdfBuffer: Buffer
) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to,
    subject,
    text,
    attachments: [
      {
        filename,
        content: pdfBuffer,
      },
    ],
  });
};
