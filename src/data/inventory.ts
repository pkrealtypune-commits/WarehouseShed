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
    title: "Premium Logistics Hub - Wagholi",
    image: "/assets/wagholi.avif",
    area: "45,000 sq.ft",
    type: "Warehouse",
    height: "32 ft Apex",
    flooring: "5 Ton FM2 Grade",
    docks: "4 Loading Bays",
    status: "Ready",
    description: "Centrally located in Wagholi with high-speed connectivity to the Pune-Ahmednagar Highway. Ideal for e-commerce and distribution.",
  },
  {
    id: 2,
    location: "Lonikand",
    title: "Strategic Distribution Center",
    image: "/assets/lonikand.avif",
    area: "60,000 sq.ft",
    type: "Industrial Shed",
    height: "30 ft Apex",
    flooring: "VDF Flooring",
    docks: "6 Loading Bays",
    status: "Ready",
    description: "A robust industrial shed with wide approach roads for heavy trailers. Perfect for long-term industrial storage.",
  },
  {
    id: 3,
    location: "Lohegaon",
    title: "Last Mile Delivery Base",
    image: "/assets/lohegaon.avif",
    area: "25,000 sq.ft",
    type: "Warehouse",
    height: "25 ft Apex",
    flooring: "Trimix Flooring",
    docks: "2 Loading Bays",
    status: "Ready",
    description: "Located within close proximity to the airport, this facility is optimized for last-mile delivery and quick turnarounds.",
  },
  {
    id: 4,
    location: "Kesanand Phata",
    title: "Heavy Duty Industrial Shed",
    image: "/assets/kesanand.avif",
    area: "80,000 sq.ft",
    type: "Built-to-Suit",
    height: "35 ft Apex",
    flooring: "High Load Bearing",
    docks: "Customizable",
    status: "Built-to-Suit",
    description: "Large scale land parcel available for custom industrial construction to meet your specific manufacturing requirements.",
  },
  {
    id: 5,
    location: "Chakan MIDC",
    title: "Grade-A Manufacturing Space",
    image: "/assets/chakan.avif",
    area: "1,20,000 sq.ft",
    type: "Industrial Park",
    height: "40 ft Apex",
    flooring: "Laser Screed FM2",
    docks: "12 Loading Bays",
    status: "Upcoming",
    description: "A world-class industrial park currently under development in the heart of Chakan's automobile hub.",
  },
  {
    id: 6,
    location: "Talegaon",
    title: "Modern Storage Facility",
    image: "/assets/talegaon.avif",
    area: "55,000 sq.ft",
    type: "Warehouse",
    height: "30 ft Apex",
    flooring: "5 Ton Capacity",
    docks: "5 Loading Bays",
    status: "Ready",
    description: "Modern facility with 24/7 security and advanced fire-fighting systems located in the growing Talegaon industrial zone.",
  },
];