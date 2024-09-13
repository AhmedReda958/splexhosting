import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function POST(
  request: NextRequest,
  { params }: { params: { productId: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    const { id } = session?.user;

    const user = await prisma.user.findUnique({
      where: { id: Number(id) },
      select: { id: true, credits: true },
    });

    if (!user) {
      throw new Error("User not found");
    }

    const product = await prisma.product.findUnique({
      where: { id: Number(params.productId) },
    });

    if (!product) {
      throw new Error("Product not found");
    }

    if (user.credits < product.price) {
      throw new Error("Not enough credits");
    }

    await prisma.user.update({
      where: { id: user.id },
      data: {
        credits: {
          decrement: product.price,
        },
      },
    });

    await prisma.server.create({
      data: {
        userId: user.id,
        ip4: "",
        status: "pending",
        type: product.type,
        name: product.name,
        ram: product.ram,
        cpu: product.cpu,
        cores: product.cores,
        storage: product.storage,
      },
    });

    await prisma.order.create({
      data: {
        productId: product.id,
        userId: user.id,
        expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30), // 30 days
      },
    });

    await prisma.inovice.create({
      data: {
        userId: user.id,
        amount: -product.price,
        description: `Order Product ${product.name} for ${product.price} credits.`,
        status: "success",
      },
    });

    return NextResponse.json({ message: "Order created" }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 400 }
    );
  }
}
