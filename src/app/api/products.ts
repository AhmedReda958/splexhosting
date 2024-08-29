import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { name, description, price, order, categoryId } = req.body;
    const product = await prisma.product.create({
      data: { name, description, price, order, categoryId },
    });
    res.status(200).json(product);
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
