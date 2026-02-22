import interiorLiving from "@/assets/interior-living.jpg";
import interiorKitchen from "@/assets/interior-kitchen.jpg";
import interiorBedroom from "@/assets/interior-bedroom.jpg";
import interiorBathroom from "@/assets/interior-bathroom.jpg";
import interiorTerrace from "@/assets/interior-terrace.jpg";
import floorplan2 from "@/assets/floorplan-2room.jpg";
import floorplan3 from "@/assets/floorplan-3room.jpg";
import floorplan4 from "@/assets/floorplan-4room.jpg";

export interface Apartment {
  id: string;
  name: string;
  rooms: number;
  size: number;
  floor: number;
  price: number;
  thumbnail: string;
  gallery: { src: string; label: string }[];
  available: boolean;
  features: string[];
}

const img = {
  living: interiorLiving,
  kitchen: interiorKitchen,
  bedroom: interiorBedroom,
  bathroom: interiorBathroom,
  terrace: interiorTerrace,
  fp2: floorplan2,
  fp3: floorplan3,
  fp4: floorplan4,
};

const gallery2 = [
  { src: img.living, label: "Dnevna soba" },
  { src: img.kitchen, label: "Kuhinja" },
  { src: img.bathroom, label: "Kupatilo" },
  { src: img.fp2, label: "Osnova stana" },
];

const gallery25 = [
  { src: img.bedroom, label: "Spavaća soba" },
  { src: img.living, label: "Dnevna soba" },
  { src: img.kitchen, label: "Kuhinja" },
  { src: img.bathroom, label: "Kupatilo" },
  { src: img.fp2, label: "Osnova stana" },
];

const gallery3 = [
  { src: img.kitchen, label: "Kuhinja" },
  { src: img.living, label: "Dnevna soba" },
  { src: img.bedroom, label: "Spavaća soba" },
  { src: img.terrace, label: "Terasa" },
  { src: img.fp3, label: "Osnova stana" },
];

const gallery4 = [
  { src: img.living, label: "Dnevna soba" },
  { src: img.bedroom, label: "Spavaća soba" },
  { src: img.kitchen, label: "Kuhinja" },
  { src: img.bathroom, label: "Kupatilo" },
  { src: img.terrace, label: "Terasa" },
  { src: img.fp4, label: "Osnova stana" },
];

const gallery5 = [
  { src: img.terrace, label: "Krovna terasa" },
  { src: img.living, label: "Dnevna soba" },
  { src: img.bedroom, label: "Master spavaća" },
  { src: img.kitchen, label: "Kuhinja" },
  { src: img.bathroom, label: "Kupatilo" },
  { src: img.fp4, label: "Osnova stana" },
];

export const apartments: Apartment[] = [
  { id: "A1", name: "Stan A1", rooms: 2.5, size: 65, floor: 3, price: 89000, thumbnail: img.living, gallery: gallery25, available: true, features: ["Terasa", "Parking"] },
  { id: "A2", name: "Stan A2", rooms: 2, size: 52, floor: 1, price: 72000, thumbnail: img.terrace, gallery: gallery2, available: true, features: ["Bašta", "Parking"] },
  { id: "A3", name: "Stan A3", rooms: 2, size: 48, floor: 2, price: 66500, thumbnail: img.bathroom, gallery: gallery2, available: true, features: ["Terasa", "Ostava"] },
  { id: "A4", name: "Stan A4", rooms: 2.5, size: 62, floor: 4, price: 85000, thumbnail: img.kitchen, gallery: gallery25, available: false, features: ["Terasa", "Parking"] },
  { id: "B1", name: "Stan B1", rooms: 3, size: 82, floor: 5, price: 115000, thumbnail: img.kitchen, gallery: gallery3, available: true, features: ["Terasa", "Ostava", "Parking"] },
  { id: "B2", name: "Stan B2", rooms: 3, size: 78, floor: 2, price: 108000, thumbnail: img.living, gallery: gallery3, available: true, features: ["Terasa", "Parking"] },
  { id: "B3", name: "Stan B3", rooms: 3, size: 85, floor: 3, price: 119000, thumbnail: img.bedroom, gallery: gallery3, available: true, features: ["Terasa", "Parking", "Ostava"] },
  { id: "B4", name: "Stan B4", rooms: 3, size: 76, floor: 6, price: 112000, thumbnail: img.terrace, gallery: gallery3, available: false, features: ["Dve terase", "Parking"] },
  { id: "B5", name: "Stan B5", rooms: 3, size: 88, floor: 1, price: 118000, thumbnail: img.bathroom, gallery: gallery3, available: true, features: ["Bašta", "Ostava", "Parking"] },
  { id: "C1", name: "Stan C1", rooms: 2.5, size: 68, floor: 4, price: 94000, thumbnail: img.bedroom, gallery: gallery25, available: true, features: ["Terasa", "Ostava"] },
  { id: "C2", name: "Stan C2", rooms: 2.5, size: 70, floor: 7, price: 98000, thumbnail: img.terrace, gallery: gallery25, available: true, features: ["Terasa", "Parking"] },
  { id: "C3", name: "Stan C3", rooms: 2, size: 55, floor: 5, price: 76500, thumbnail: img.kitchen, gallery: gallery2, available: true, features: ["Terasa"] },
  { id: "D1", name: "Stan D1", rooms: 4, size: 105, floor: 6, price: 148000, thumbnail: img.living, gallery: gallery4, available: true, features: ["Dve terase", "Ostava", "2x Parking"] },
  { id: "D2", name: "Stan D2", rooms: 4, size: 110, floor: 3, price: 152000, thumbnail: img.bathroom, gallery: gallery4, available: true, features: ["Terasa", "Ostava", "2x Parking"] },
  { id: "D3", name: "Stan D3", rooms: 4, size: 98, floor: 2, price: 138000, thumbnail: img.bedroom, gallery: gallery4, available: false, features: ["Bašta", "Ostava", "Parking"] },
  { id: "D4", name: "Stan D4", rooms: 4, size: 115, floor: 7, price: 162000, thumbnail: img.terrace, gallery: gallery4, available: true, features: ["Dve terase", "2x Parking", "Ostava"] },
  { id: "E1", name: "Stan E1", rooms: 5, size: 130, floor: 7, price: 185000, thumbnail: img.living, gallery: gallery5, available: true, features: ["Penthouse", "Dve terase", "2x Parking"] },
  { id: "E2", name: "Stan E2", rooms: 5, size: 140, floor: 8, price: 198000, thumbnail: img.kitchen, gallery: gallery5, available: true, features: ["Penthouse", "Krovna terasa", "2x Parking"] },
  { id: "E3", name: "Stan E3", rooms: 5, size: 125, floor: 6, price: 178000, thumbnail: img.bathroom, gallery: gallery5, available: true, features: ["Dve terase", "Ostava", "2x Parking"] },
  { id: "E4", name: "Stan E4", rooms: 5, size: 150, floor: 8, price: 215000, thumbnail: img.terrace, gallery: gallery5, available: false, features: ["Penthouse", "Krovna terasa", "3x Parking"] },
];

export const formatPrice = (price: number) => {
  return new Intl.NumberFormat('de-DE').format(price);
};
