import { Suspense } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import OpenFormButton, { ProductActions } from "./productForm";
import prisma from "@/lib/prisma";

async function getProducts() {
  try {
    const products = await prisma.product.findMany();
    return products;
  } catch (error) {
    console.error("Error fetching products:", error);
    // Handle the error here, e.g. show an error message to the user
    return [];
  }
}

export default async function ServerComponent() {
  const products = await getProducts();

  return (
    <div className="container mx-auto px-4 py-8">
      <header className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Server Products Management</h1>
        <OpenFormButton />
      </header>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>CPU</TableHead>
            <TableHead>RAM</TableHead>
            <TableHead>Storage</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {products.map((product) => (
            <TableRow key={product.id}>
              <TableCell>{product.name}</TableCell>
              <TableCell>{product.type}</TableCell>
              <TableCell>{product.cpu}</TableCell>
              <TableCell>{product.ram}</TableCell>
              <TableCell>{product.storage}</TableCell>
              <TableCell>${product.price}/mo</TableCell>
              <TableCell>
                <Suspense fallback={<div>Loading...</div>}>
                  <ProductActions product={product} />
                </Suspense>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
