import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { name, order } = req.body;
    const category = await prisma.category.create({
      data: { name, order },
    });
    res.status(200).json(category);
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
