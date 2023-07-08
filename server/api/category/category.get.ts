import {Prisma, PrismaClient} from '@prisma/client'

export default defineEventHandler(async (event) => {


    const prisma = new PrismaClient()

    const category = await prisma.category.findMany()

    return category;

})