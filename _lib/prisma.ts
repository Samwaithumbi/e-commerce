import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function clearProducts() {
  try {
    const result = await prisma.product.deleteMany();
    console.log("Deleted products:", result.count);
  } catch (error) {
    console.error("Error deleting products:", error);
  } finally {
    await prisma.$disconnect();
  }
}

clearProducts();