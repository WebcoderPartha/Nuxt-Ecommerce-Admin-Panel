import {Prisma, PrismaClient} from '@prisma/client'

export default defineEventHandler(async (event) => {

   
    const prisma = new PrismaClient()

    const data = await prisma.product.findMany({
        orderBy: {
            id: 'desc'
        },
        include: {
            category: true
        }
       
    })


    return data

})