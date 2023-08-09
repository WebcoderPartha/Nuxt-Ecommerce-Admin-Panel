import {Prisma, PrismaClient} from '@prisma/client'

export default defineEventHandler(async (event) => {

    const prisma = new PrismaClient()

    const category = await prisma.category.findMany({
        orderBy: {
            id: 'asc'
        },
        include: {
            product:true
        },
        take: 6
    })

    return category;

})