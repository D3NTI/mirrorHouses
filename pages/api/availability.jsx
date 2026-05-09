import prisma from '../../lib/prisma';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      const { house } = req.query;

      const bookings = await prisma.booking.findMany({
        where: house ? { house } : {},
        select: {
          dateFrom: true,
          dateTo: true,
        },
      });

      res.status(200).json({ success: true, bookings });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, error: 'Ошибка сервера' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
