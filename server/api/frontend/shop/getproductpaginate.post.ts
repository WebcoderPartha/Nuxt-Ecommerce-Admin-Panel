import { Prisma, PrismaClient } from "@prisma/client";

// import { getServerSession } from "#auth";

export default defineEventHandler(async (event) => {

  const prisma = new PrismaClient();
  const getBody = await readBody(event) 
    
  const totalCount = await prisma.product.aggregate({
    _count: {
        name: true
    }
  })
  const totalItem = totalCount._count.name

  const paginate = await prisma.product.findMany({
    take: parseInt(getBody?.take),
    skip: parseInt(getBody?.skip),
    orderBy: {
        id: 'desc'
    }
  });

  return {
    products: paginate,
    total: totalItem
  };
});
