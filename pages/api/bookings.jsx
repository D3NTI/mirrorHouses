import prisma from '../../lib/prisma';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const { name, phone, email, house, dateFrom, dateTo, kupel, totalPrice } =
        req.body;

      const booking = await prisma.booking.create({
        data: {
          name,
          phone,
          email,
          house,
          dateFrom: new Date(dateFrom),
          dateTo: new Date(dateTo),
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
