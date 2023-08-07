import { Prisma, PrismaClient } from "@prisma/client";

// import { getServerSession } from "#auth";

export default defineEventHandler(async (event) => {

  const prisma = new PrismaClient();
  const getBody = await readBody(event) 
  
  const allWishlist = await prisma.product.findMany({
    take: parseInt(getBody.limit),
    orderBy: {
        id: 'desc'
    }
  });

  return allWishlist;
});
