import {Prisma, PrismaClient} from '@prisma/client'

export default defineEventHandler(async (event) => {

    const prisma = new PrismaClient()
    const getBody = await readBody(event)

    const product = await prisma.product.findMany({
        orderBy: {
            id: 'desc'
        },
        include: {
            category: true,
            wishlist: true,
            gallery: true
        },
        take:getBody?.limit
    })

    return product;

})