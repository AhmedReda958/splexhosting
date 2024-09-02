export type Plan = {
  name: string;
  description: string;
  price: number;
  features: string[];
};

export const vpsPlans: Plan[] = [
  {
    name: "Basic VPS",
    description: "Perfect for small projects and websites",
    price: 10,
    features: [
      "1 vCPU",
      "2 GB RAM",
      "20 GB SSD",
      "1 TB Transfer",
      "24/7 Support",
    ],
  },
  {
    name: "Pro VPS",
    description: "Ideal for growing businesses",
    price: 25,
    features: [
      "2 vCPU",
      "4 GB RAM",
      "50 GB SSD",
      "2 TB Transfer",
      "24/7 Priority Support",
    ],
  },
  {
    name: "Enterprise VPS",
    description: "For high-traffic applications",
    price: 50,
    features: [
      "4 vCPU",
      "8 GB RAM",
      "100 GB SSD",
      "5 TB Transfer",
      "24/7 Premium Support",
    ],
  },
  {
    name: "Gaming server VPS",
    description: "For high-traffic applications",
    price: 50,
    features: [
      "4 vCPU",
      "8 GB RAM",
      "100 GB SSD",
      "5 TB Transfer",
      "24/7 Premium Support",
    ],
  },
];

export const dedicatedPlans: Plan[] = [
  {
    name: "Starter Dedicated",
    description: "Entry-level dedicated power",
    price: 99,
    features: [
      "4 Cores",
      "16 GB RAM",
      "1 TB HDD",
      "10 TB Transfer",
      "24/7 Support",
    ],
  },
  {
    name: "Business Dedicated",
    description: "For medium to large businesses",
    price: 199,
    features: [
      "8 Cores",
      "32 GB RAM",
      "2 TB SSD",
      "20 TB Transfer",
      "24/7 Priority Support",
    ],
  },
  {
    name: "Enterprise Dedicated",
    description: "Ultimate performance for demanding applications",
    price: 399,
    features: [
      "16 Cores",
      "64 GB RAM",
      "4 TB NVMe SSD",
      "Unlimited Transfer",
      "24/7 Premium Support",
    ],
  },
];
