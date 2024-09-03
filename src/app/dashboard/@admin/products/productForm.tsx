"use client";

import { useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Toast } from "@/components/ui/toast";
import { Toaster } from "@/components/ui/toaster";
import { useToast } from "@/hooks/use-toast";
import { PlusCircle, Pencil, Trash2, Search, X } from "lucide-react";
import { Product } from "@prisma/client";
import { Textarea } from "@/components/ui/textarea";

export default function OpenFormButton() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  return (
    <>
      <div className="flex justify-between items-center">
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <PlusCircle className="mr-2 h-4 w-4" /> Add New Product
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <ProductForm
              product={null}
              onSubmit={() => setIsDialogOpen(false)}
            />
          </DialogContent>
        </Dialog>
        <Toaster />
      </div>
    </>
  );
}

export function ProductActions({ product }: { product: Product }) {
  const { toast } = useToast();
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleDeleteProduct = useCallback(
    async (id: number) => {
      try {
        const response = await fetch(`/api/products/`, {
          method: "DELETE",
          body: JSON.stringify({
            id: product.id,
          }),
        });

        if (response.ok) {
          toast({
            title: "Product Deleted",
            description: "The product has been deleted successfully.",
          });
          window.location.reload();
        } else {
          const data = await response.json();
          toast({
            title: "Error",
            description: data.message,
            variant: "destructive",
          });
        }
      } catch (error) {
        toast({
          title: "Error",
          description: "An error occurred while deleting the product.",
          variant: "destructive",
        });
      }
    },
    [toast, product.id]
  );

  return (
    <div className="flex space-x-2">
      <Button variant="outline" size="sm" onClick={() => setIsDialogOpen(true)}>
        <Pencil className="h-4 w-4" />
      </Button>
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button variant="outline" size="sm">
            <Trash2 className="h-4 w-4" />
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the
              {product.name} product.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={() => handleDeleteProduct(product.id)}>
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-md">
          <ProductForm
            product={product}
            onSubmit={() => setIsDialogOpen(false)}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
}

function ProductForm({
  product,
  onSubmit,
}: {
  product: Product | null;
  onSubmit: () => void;
}) {
  const [formData, setFormData] = useState(
    product || {
      name: "",
      type: "VPS",
      cpu: "",
      cores: "",
      ram: "",
      storage: "",
      price: "",
      description: "",
      features: [],
    }
  );
  const [newFeature, setNewFeature] = useState("");

  const { toast } = useToast();

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { name, value } = e.target;
      setFormData((prevData) => ({ ...prevData, [name]: value }));
    },
    []
  );

  const handleAddFeature = useCallback(() => {
    if (newFeature.trim()) {
      setFormData((prevData: any) => ({
        ...prevData,
        features: [...prevData.features, newFeature.trim()],
      }));
      setNewFeature("");
    }
  }, [newFeature]);

  const handleRemoveFeature = useCallback((index: number) => {
    setFormData((prevData: any) => ({
      ...prevData,
      features: prevData.features.filter((_: any, i: number) => i !== index),
    }));
  }, []);

  const addProduct = useCallback(async () => {
    const data = {
      ...formData,
      price: Number(formData.price),
      ram: Number(formData.ram),
      cores: Number(formData.cores),
      storage: Number(formData.storage),
    };

    const response = await fetch("/api/products", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (response.ok) {
      onSubmit();
      toast({
        title: "Product Added",
        description: "The product has been added successfully.",
      });
      window.location.reload();
    } else {
      const data = await response.json();
      toast({
        title: "Error",
        description: data.message,
        variant: "destructive",
      });
    }
  }, [formData, onSubmit, toast]);

  const editProduct = useCallback(async () => {
    const data = {
      ...formData,
      price: Number(formData.price),
      ram: Number(formData.ram),
      cores: Number(formData.cores),
      storage: Number(formData.storage),
    };

    const response = await fetch(`/api/products/`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (response.ok) {
      onSubmit();
      toast({
        title: "Product Updated",
        description: "The product has been updated successfully.",
      });
      window.location.reload();
    } else {
      const data = await response.json();
      toast({
        title: "Error",
        description: data.message,
        variant: "destructive",
      });
    }
  }, [formData, onSubmit, toast]);

  const handleSubmit = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      console.log(formData);
      if (product) {
        editProduct();
      } else {
        addProduct();
      }
    },
    [formData, product, addProduct, editProduct]
  );

  return (
    <form onSubmit={handleSubmit}>
      <DialogHeader>
        <DialogTitle>
          {product ? "Edit Product" : "Add New Product"}
        </DialogTitle>
        <DialogDescription>
          {product
            ? "Make changes to the existing product here."
            : "Add the details of the new server product here."}
        </DialogDescription>
      </DialogHeader>
      <div className="grid gap-4 py-4">
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="name" className="text-right">
            Name
          </Label>
          <Input
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="col-span-3"
            required
          />
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="type" className="text-right">
            Type
          </Label>
          <Select
            name="type"
            value={formData.type}
            onValueChange={(value) =>
              setFormData((prevData) => ({ ...prevData, type: value }))
            }
          >
            <SelectTrigger className="col-span-3">
              <SelectValue placeholder="Select a product type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="vps">VPS</SelectItem>
              <SelectItem value="dedicated">Dedicated</SelectItem>
            </SelectContent>
          </Select>
        </div>
        {formData.type == "vps" ? (
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="cores" className="text-right">
              CPU Cores
            </Label>
            <Input
              id="cores"
              name="cores"
              type="number"
              value={formData.cores ?? ""}
              onChange={handleChange}
              className="col-span-3"
              placeholder="e.g., 4 Cores"
              required
            />
          </div>
        ) : (
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="cpu" className="text-right">
              CPU
            </Label>
            <Input
              id="cpu"
              name="cpu"
              value={formData.cpu ?? ""}
              onChange={handleChange}
              className="col-span-3"
              placeholder="e.g., 2 vCPU or 4 Cores"
              required
            />
          </div>
        )}
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="ram" className="text-right">
            RAM
          </Label>
          <Input
            id="ram"
            name="ram"
            value={formData.ram ?? ""}
            onChange={handleChange}
            className="col-span-3"
            placeholder="e.g., 4 GB"
            required
          />
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="storage" className="text-right">
            Storage
          </Label>
          <Input
            id="storage"
            name="storage"
            value={formData.storage ?? ""}
            onChange={handleChange}
            className="col-span-3"
            placeholder="e.g., 100 GB SSD"
            required
          />
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="price" className="text-right">
            Price
          </Label>
          <Input
            id="price"
            name="price"
            type="number"
            value={formData.price}
            onChange={handleChange}
            className="col-span-3"
            placeholder="Monthly price in USD"
            required
          />
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="description" className="text-right">
            Description
          </Label>
          <Textarea
            id="description"
            name="description"
            value={formData.description ?? ""}
            onChange={handleChange}
            className="col-span-3"
            required
          />
        </div>
        <div className="grid grid-cols-4 items-start gap-4">
          <Label htmlFor="features" className="text-right mt-2">
            Features
          </Label>
          <div className="col-span-3 space-y-2">
            {formData.features?.map((feature, index) => (
              <div key={index} className="flex items-center space-x-2">
                <span>{feature}</span>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => handleRemoveFeature(index)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ))}
            <div className="flex items-center space-x-2">
              <Input
                id="newFeature"
                value={newFeature}
                onChange={(e) => setNewFeature(e.target.value)}
                placeholder="Add a new feature"
              />
              <Button type="button" onClick={handleAddFeature}>
                Add
              </Button>
            </div>
          </div>
        </div>
      </div>
      <DialogFooter>
        <Button type="submit">
          {product ? "Save Changes" : "Add Product"}
        </Button>
      </DialogFooter>
    </form>
  );
}
