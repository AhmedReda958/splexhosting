"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { ServerIcon } from "lucide-react";

const NewServerForm = () => {
  const [serverDetails, setServerDetails] = useState({
    name: "",
    cpu: "",
    customCpu: "",
    ram: "",
    customRam: "",
    storage: "",
    customStorage: "",
    notes: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setServerDetails((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name, value) => {
    setServerDetails((prev) => ({
      ...prev,
      [name]: value,
      [`custom${name.charAt(0).toUpperCase() + name.slice(1)}`]:
        value === "custom"
          ? prev[`custom${name.charAt(0).toUpperCase() + name.slice(1)}`]
          : "",
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("New server details:", serverDetails);
    // Here you would typically send this data to your backend
    // Reset form or redirect user after successful submission
  };
  return (
    <form onSubmit={handleSubmit}>
      <Card>
        <CardHeader>
          <CardTitle>Server Configuration</CardTitle>
          <CardDescription>
            Specify the details for the new server instance.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="name">Server Name</Label>
            <Input
              id="name"
              name="name"
              value={serverDetails.name}
              onChange={handleInputChange}
              placeholder="Enter a name for this server"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="cpu">CPU (vCPU)</Label>
              <Select
                name="cpu"
                onValueChange={(value) => handleSelectChange("cpu", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select CPU" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">1 vCPU</SelectItem>
                  <SelectItem value="2">2 vCPU</SelectItem>
                  <SelectItem value="4">4 vCPU</SelectItem>
                  <SelectItem value="8">8 vCPU</SelectItem>
                  <SelectItem value="custom">Custom</SelectItem>
                </SelectContent>
              </Select>
              {serverDetails.cpu === "custom" && (
                <Input
                  id="customCpu"
                  name="customCpu"
                  value={serverDetails.customCpu}
                  onChange={handleInputChange}
                  placeholder="Enter custom CPU"
                  className="mt-2"
                />
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="ram">RAM</Label>
              <Select
                name="ram"
                onValueChange={(value) => handleSelectChange("ram", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select RAM" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="2">2 GB</SelectItem>
                  <SelectItem value="4">4 GB</SelectItem>
                  <SelectItem value="8">8 GB</SelectItem>
                  <SelectItem value="16">16 GB</SelectItem>
                  <SelectItem value="custom">Custom</SelectItem>
                </SelectContent>
              </Select>
              {serverDetails.ram === "custom" && (
                <Input
                  id="customRam"
                  name="customRam"
                  value={serverDetails.customRam}
                  onChange={handleInputChange}
                  placeholder="Enter custom RAM"
                  className="mt-2"
                />
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="storage">Storage</Label>
              <Select
                name="storage"
                onValueChange={(value) => handleSelectChange("storage", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select Storage" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="20">20 GB SSD</SelectItem>
                  <SelectItem value="40">40 GB SSD</SelectItem>
                  <SelectItem value="80">80 GB SSD</SelectItem>
                  <SelectItem value="160">160 GB SSD</SelectItem>
                  <SelectItem value="custom">Custom</SelectItem>
                </SelectContent>
              </Select>
              {serverDetails.storage === "custom" && (
                <Input
                  id="customStorage"
                  name="customStorage"
                  value={serverDetails.customStorage}
                  onChange={handleInputChange}
                  placeholder="Enter custom storage"
                  className="mt-2"
                />
              )}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="notes">Additional Notes</Label>
            <Textarea
              id="notes"
              name="notes"
              value={serverDetails.notes}
              onChange={handleInputChange}
              placeholder="Enter any additional notes or requirements"
            />
          </div>
        </CardContent>
        <CardFooter>
          <Button type="submit" className="w-full">
            <ServerIcon className="mr-2 h-4 w-4" />
            Deploy Server
          </Button>
        </CardFooter>
      </Card>
    </form>
  );
};

export default NewServerForm;
