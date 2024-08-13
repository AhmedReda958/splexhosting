import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;

  if (req.method === 'POST') {
    const product = await prisma.product.findUnique({ where: { id: parseInt(id as string) } });
    if (product) {
      const clonedProduct = await prisma.product.create({
        data: {
          name: product.name + ' (Copy)',
          description: product.description,
          price: product.price,
          order: product.order,
          categoryId: product.categoryId,
        },
      });
      res.status(200).json(clonedProduct);
    } else {
      res.status(404).json({ message: 'Product not found' });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
