import {Prisma, PrismaClient} from '@prisma/client'

export default defineEventHandler(async (event) => {

   
    const prisma = new PrismaClient()

    const getBody = await readBody(event);

    const data = await prisma.product.findFirst({
        where: {
            id: parseInt(getBody.id)
        },
        include: {
            category: true
        }
    })

    return data;

})