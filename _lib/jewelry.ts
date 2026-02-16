export interface JewelryProduct {
  id: number;
  name: string;
  slug: string;
  category:string,
  price: number;
  image: string;
  description: string; // added
}

export const jewelryProducts: JewelryProduct[] = [
  {
    id: 1,
    name: "Gold Necklace",
    slug: "gold-necklace",
    category:"necklace",
    price: 120,
    image: "/necklace.jpg",
    description: "Elegant 18k gold necklace perfect for weddings and parties."
  },
  {
    id: 2,
    name: "Diamond Ring",
    slug: "diamond-ring",
    category:"ring",
    price: 250,
    image: "/necklace.jpg",
    description: "Sparkling diamond ring with a classic design for special occasions."
  },
  {
    id: 3,
    name: "Silver Bracelet",
    slug: "silver-bracelet",
    category:"bracelet",
    price: 80,
    image: "/necklace.jpg",
    description: "Stylish sterling silver bracelet suitable for everyday wear."
  },
  {
    id: 4,
    name: "Pearl Earrings",
    slug: "pearl-earrings",
    category:"earrings",
    price: 60,
    image: "/necklace.jpg",
    description: "Delicate pearl earrings that add elegance to any outfit."
  }
];
