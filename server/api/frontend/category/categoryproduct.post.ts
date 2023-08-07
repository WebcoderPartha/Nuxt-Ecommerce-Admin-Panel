import {Prisma, PrismaClient} from '@prisma/client'

export default defineEventHandler(async (event) => {

    const prisma = new PrismaClient()
    const getBody = await readBody(event)
    const category = await prisma.category.findFirst({
        where: {
            slug: getBody.slug 
        },
        include: {
            product:true
        }
    })

    return category;

})