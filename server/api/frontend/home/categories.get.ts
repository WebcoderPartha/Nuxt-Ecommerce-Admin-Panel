import {Prisma, PrismaClient} from '@prisma/client'

export default defineEventHandler(async (event) => {

    const prisma = new PrismaClient()

    const categories = await prisma.category.findMany({
        orderBy: {
            id: 'desc'
        },
        take: 11
    })

    return categories;

})