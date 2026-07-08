import prisma from '../../lib/prisma';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

const houseNames = {
  1: 'Берёзовый',
  2: 'Еловый',
  3: 'Барнхауз',
};

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const { name, phone, email, house, dateFrom, dateTo, kupel, totalPrice } =
        req.body;

      function toUTCDate(date) {
        const d = new Date(date);
        return new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
      }

      // Отправляем письмо гостю
      await resend.emails.send({
        from: 'HVOYA <onboarding@resend.dev>',
        to: email,
        subject: 'Заявка на бронирование получена — HVOYA',
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px;">
            <h2 style="color: #1a3220;">Привет, ${name}!</h2>
            <p>Мы получили вашу заявку на бронирование. Скоро свяжемся с вами для подтверждения.</p>
            <div style="background: #e8f2eb; border-radius: 10px; padding: 20px; margin: 20px 0;">
              <h3 style="color: #1a3220; margin-top: 0;">Детали бронирования</h3>
              <p><b>Домик:</b> ${houseNames[house] || house}</p>
              <p><b>Заезд:</b> ${new Date(dateFrom).toLocaleDateString('ru-RU')}</p>
              <p><b>Выезд:</b> ${new Date(dateTo).toLocaleDateString('ru-RU')}</p>
              <p><b>Купель:</b> ${kupel ? 'Да (+150 BYN)' : 'Нет'}</p>
              <p style="font-size: 18px;"><b>Итого: ${totalPrice} BYN</b></p>
            </div>
            <p style="color: #666;">По вопросам пишите нам в WhatsApp или на email.</p>
            <p style="color: #1a3220;"><b>Команда HVOYA</b></p>
          </div>
        `,
      });

      // Отправляем письмо администратору
      await resend.emails.send({
        from: 'HVOYA <onboarding@resend.dev>',
        to: process.env.ADMIN_EMAIL,
        subject: `Новая заявка от ${name}`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px;">
            <h2 style="color: #1a3220;">Новая заявка на бронирование</h2>
            <div style="background: #e8f2eb; border-radius: 10px; padding: 20px;">
              <p><b>Имя:</b> ${name}</p>
              <p><b>Телефон:</b> ${phone}</p>
              <p><b>Email:</b> ${email}</p>
              <p><b>Домик:</b> ${houseNames[house] || house}</p>
              <p><b>Заезд:</b> ${new Date(dateFrom).toLocaleDateString('ru-RU')}</p>
              <p><b>Выезд:</b> ${new Date(dateTo).toLocaleDateString('ru-RU')}</p>
              <p><b>Купель:</b> ${kupel ? 'Да (+150 BYN)' : 'Нет'}</p>
              <p style="font-size: 18px;"><b>Итого: ${totalPrice} BYN</b></p>
            </div>
          </div>
        `,
      });

      // Сохраняем в БД только после успешной отправки писем
      const booking = await prisma.booking.create({
        data: {
          name,
          phone,
          email,
          house,
          dateFrom: toUTCDate(dateFrom),
          dateTo: toUTCDate(dateTo),
          kupel,
          totalPrice,
        },
      });

      res.status(200).json({ success: true, booking });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, error: 'Ошибка сервера' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
