import {Prisma, PrismaClient} from '@prisma/client'

export default defineEventHandler(async (event) => {

    const prisma = new PrismaClient()

    const product = await prisma.product.findMany({
        orderBy: {
            id: 'desc'
        },
        include: {
            category: true,
            wishlist: true
        },
        take: 8,
    })

    return product;

})