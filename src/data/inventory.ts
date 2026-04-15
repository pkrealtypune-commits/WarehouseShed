// data/inventory.ts

export interface Property {
  id: number;
  location: string;
  title: string;
  image: string;
  area: string;
  type: string;
  // Technical Specs for Modal
  height: string;
  flooring: string;
  docks: string;
  status: "Ready" | "Built-to-Suit" | "Upcoming";
  description: string;
}

export const inventoryData: Property[] = [
  {
    id: 1,
    location: "Wagholi",
    title: "Warehouse on Rent in Wagholi Pune",
    image: "/assets/wagholi.avif",
    area: "45,000 sq.ft",
    type: "Warehouse",
    height: "32 ft Approx",
    flooring: "5 Ton FM2 Grade",
    docks: "4 Loading Bays",
    status: "Ready",
    description: "Premium warehouse for rent in Wagholi with high-speed connectivity to the Pune-Ahmednagar Highway. Ideal for e-commerce and logistics distribution.",
  },
  {
    id: 2,
    location: "Chakan MIDC",
    title: "Industrial Shed for Rent in Chakan MIDC",
    image: "/assets/lonikand.avif",
    area: "60,000 sq.ft",
    type: "Industrial Shed",
    height: "30 ft Approx",
    flooring: "VDF Flooring",
    docks: "6 Loading Bays",
    status: "Ready",
    description: "Ready-to-move industrial shed on rent in Chakan MIDC with wide approach roads for heavy trailers. Perfect for manufacturing and industrial storage.",
  },
  {
    id: 3,
    location: "Pune",
    title: "Godown for Rent in Pune City",
    image: "/assets/lohegaon.avif",
    area: "25,000 sq.ft",
    type: "Warehouse",
    height: "25 ft Approx",
    flooring: "Trimix Flooring",
    docks: "2 Loading Bays",
    status: "Ready",
    description: "Centrally located godown on rent in Pune. Optimized for last-mile delivery, quick turnarounds, and local distribution hubs.",
  },
  {
    id: 4,
    location: "Talegaon",
    title: "Industrial Land for Sale in Talegaon",
    image: "/assets/kesanand.avif",
    area: "80,000 sq.ft",
    type: "Industrial Plot",
    height: "Custom",
    flooring: "High Load Bearing",
    docks: "Customizable",
    status: "Built-to-Suit",
    description: "Premium industrial land for sale in Talegaon Dabhade. Clear title MIDC plots available for custom industrial construction and manufacturing units.",
  },
  {
    id: 5,
    location: "Chakan",
    title: "Industrial Plot for Sale in Chakan",
    image: "/assets/chakan.avif",
    area: "1,20,000 sq.ft",
    type: "MIDC Plot",
    height: "40 ft Approx",
    flooring: "Laser Screed FM2",
    docks: "12 Loading Bays",
    status: "Upcoming",
    description: "Strategic MIDC plot for sale in Chakan. A world-class industrial space currently under development in the heart of the automobile hub.",
  },
  {
    id: 6,
    location: "Lonikand",
    title: "Warehouse Space for Rent in Pune",
    image: "/assets/talegaon.avif",
    area: "55,000 sq.ft",
    type: "Warehouse",
    height: "30 ft Approx",
    flooring: "5 Ton Capacity",
    docks: "5 Loading Bays",
    status: "Ready",
    description: "Modern warehouse space for rent in Pune Lonikand with 24/7 security and advanced fire-fighting systems. Excellent connectivity for logistics.",
  },
];