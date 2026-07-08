import prisma from '../../lib/prisma';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const { code } = req.body;

      const promo = await prisma.promo.findUnique({
        where: { code: code.toUpperCase() },
      });

      if (!promo) {
        return res
          .status(404)
          .json({ success: false, error: 'Промокод не найден' });
      }

      if (!promo.isActive) {
        return res
          .status(400)
          .json({ success: false, error: 'Промокод недействителен' });
      }

      res.status(200).json({ success: true, discount: promo.discount });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, error: 'Ошибка сервера' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
