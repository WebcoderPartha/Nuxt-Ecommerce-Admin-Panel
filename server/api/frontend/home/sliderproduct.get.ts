import {Prisma, PrismaClient} from '@prisma/client'

export default defineEventHandler(async (event) => {

    const prisma = new PrismaClient()

    const product = await prisma.category.findMany({
        where:{
            homecategory: 1
        },
        orderBy: {
            id: 'desc'
        },
        include: {
            product: true
        },
        take: 8,
    })

    return product;

})