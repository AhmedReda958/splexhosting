"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
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
import { PlusCircle, Pencil, Trash2 } from "lucide-react";
import { dedicatedPlans, Plan, vpsPlans } from "@/data";

export default function Component() {
  const [plans, setPlans] = useState([...vpsPlans, ...dedicatedPlans]);
  const [editingPlan, setEditingPlan] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleAddPlan = (newPlan: Plan) => {
    setPlans([...plans, { ...newPlan, id: plans.length + 1 }]);
  };

  const handleEditPlan = (updatedPlan) => {
    setPlans(
      plans.map((plan) => (plan.id === updatedPlan.id ? updatedPlan : plan))
    );
  };

  const handleDeletePlan = (id) => {
    setPlans(plans.filter((plan) => plan.id !== id));
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <header className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Server Plans Management</h1>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => setEditingPlan(null)}>
              <PlusCircle className="mr-2 h-4 w-4" /> Add New Plan
            </Button>
          </DialogTrigger>
          <DialogContent>
            <PlanForm
              plan={editingPlan}
              onSubmit={(plan) => {
                if (editingPlan) {
                  handleEditPlan(plan);
                } else {
                  handleAddPlan(plan);
                }
                setIsDialogOpen(false);
              }}
            />
          </DialogContent>
        </Dialog>
      </header>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Description</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {plans.map((plan) => (
            <TableRow key={plan.id}>
              <TableCell>{plan.name}</TableCell>
              <TableCell>{plan.type}</TableCell>
              <TableCell>${plan.price}/mo</TableCell>
              <TableCell>{plan.description}</TableCell>
              <TableCell>
                <div className="flex space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setEditingPlan(plan);
                      setIsDialogOpen(true);
                    }}
                  >
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
                          This action cannot be undone. This will permanently
                          delete the
                          {plan.name} plan.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                          onClick={() => handleDeletePlan(plan.id)}
                        >
                          Delete
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

function PlanForm({
  plan,
  onSubmit,
}: {
  plan: Plan;
  onSubmit: (plan: Plan) => void;
}) {
  const [formData, setFormData] = useState(
    plan || {
      name: "",
      type: "VPS",
      price: "",
      description: "",
      features: [""],
    }
  );

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFeatureChange = (index, value) => {
    const newFeatures = [...formData.features];
    newFeatures[index] = value;
    setFormData({ ...formData, features: newFeatures });
  };

  const handleAddFeature = () => {
    setFormData({ ...formData, features: [...formData.features, ""] });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <DialogHeader>
        <DialogTitle>{plan ? "Edit Plan" : "Add New Plan"}</DialogTitle>
        <DialogDescription>
          {plan
            ? "Make changes to the existing plan here."
            : "Add the details of the new server plan here."}
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
          />
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="type" className="text-right">
            Type
          </Label>
          <Select
            name="type"
            value={formData.type}
            onValueChange={(value) => setFormData({ ...formData, type: value })}
          >
            <SelectTrigger className="col-span-3">
              <SelectValue placeholder="Select a plan type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="VPS">VPS</SelectItem>
              <SelectItem value="Dedicated">Dedicated</SelectItem>
            </SelectContent>
          </Select>
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
          />
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="description" className="text-right">
            Description
          </Label>
          <Input
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="col-span-3"
          />
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label className="text-right">Features</Label>
          <div className="col-span-3 space-y-2">
            {formData.features.map((feature, index) => (
              <Input
                key={index}
                value={feature}
                onChange={(e) => handleFeatureChange(index, e.target.value)}
              />
            ))}
            <Button type="button" onClick={handleAddFeature} variant="outline">
              Add Feature
            </Button>
          </div>
        </div>
      </div>
      <DialogFooter>
        <Button type="submit">{plan ? "Save Changes" : "Add Plan"}</Button>
      </DialogFooter>
    </form>
  );
}
