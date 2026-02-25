import "dotenv/config";
import { PrismaClient, Role } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL! });
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log("Seeding database...");
  console.log("DATABASE_URL:", process.env.DATABASE_URL);

  // --- USERS ---
  const admin = await prisma.user.upsert({
    where: { email: "admin@example.com" },
    update: {},
    create: {
      name: "Admin User",
      email: "admin@example.com",
      role: Role.ADMIN,
    },
  });

  const customer = await prisma.user.upsert({
    where: { email: "customer@example.com" },
    update: {},
    create: {
      name: "Customer User",
      email: "customer@example.com",
      role: Role.CUSTOMER,
    },
  });

  // --- ADDRESSES ---
  const address = await prisma.address.upsert({
    where: { id: "addr1" }, // fixed ID for upsert
    update: {},
    create: {
      id: "addr1",
      userId: customer.id,
      name: "Customer Home",
      phone: "0712345678",
      county: "Nairobi",
      town: "Westlands",
      street: "123 Main St",
      isDefault: true,
    },
  });

  // --- CATEGORIES ---
  const categories = [
    { name: "Electronics", slug: "electronics" },
    { name: "Clothing", slug: "clothing" },
    { name: "Books", slug: "books" },
  ];

  const categoryRecords = [];
  for (const cat of categories) {
    const record = await prisma.category.upsert({
      where: { slug: cat.slug },
      update: {},
      create: cat,
    });
    categoryRecords.push(record);
  }

  // --- PRODUCTS ---
  const products = [
    {
      name: "Smartphone",
      slug: "smartphone",
      description: "A cool smartphone",
      price: 499.99,
      stock: 10,
      featured: true,
      categoryId: categoryRecords[0].id,
    },
    {
      name: "Jeans",
      slug: "jeans",
      description: "Blue denim jeans",
      price: 59.99,
      stock: 25,
      featured: false,
      categoryId: categoryRecords[1].id,
    },
    {
      name: "Novel Book",
      slug: "novel-book",
      description: "Interesting fiction book",
      price: 19.99,
      stock: 100,
      featured: false,
      categoryId: categoryRecords[2].id,
    },
  ];

  for (const p of products) {
    await prisma.product.upsert({
      where: { slug: p.slug },
      update: {},
      create: p,
    });
  }

  console.log("Seeding completed successfully.");
}

main()
  .catch((e) => {
    console.error("Seeding error:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });