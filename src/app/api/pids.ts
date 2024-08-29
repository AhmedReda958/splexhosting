import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;

  if (req.method === 'PUT') {
    const { name, description, price, order } = req.body;
    const product = await prisma.product.update({
      where: { id: parseInt(id as string) },
      data: { name, description, price, order },
    });
    res.status(200).json(product);
  } else if (req.method === 'DELETE') {
    await prisma.product.delete({ where: { id: parseInt(id as string) } });
    res.status(200).json({ message: 'Product deleted' });
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
