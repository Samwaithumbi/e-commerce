export interface JewelryProduct {
    id:number;
    name:string;
    price:number;
    image:string
}


export const jewelryProducts: JewelryProduct[] = [
    {
      id: 1,
      name: "Gold Necklace",
      price: 120,
      image: "/necklace.jpg"
    },
    {
      id: 2,
      name: "Diamond Ring",
      price: 250,
      image: "/necklace.jpg"
    },
    {
      id: 3,
      name: "Silver Bracelet",
      price: 80,
      image: "/necklace.jpg"
    },
    {
      id: 4,
      name: "Pearl Earrings",
      price: 60,
      image: "/necklace.jpg"
    }
  ];
  