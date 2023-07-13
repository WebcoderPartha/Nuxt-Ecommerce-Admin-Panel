import {Prisma, PrismaClient} from '@prisma/client'

export default defineEventHandler(async (event) => {

   
    const prisma = new PrismaClient()

    const data = await prisma.category.findMany({
        where: {
            id: 4
        },
        include: {
            products: true
        }
       
    })


    return data

})