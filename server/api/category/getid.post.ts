import {Prisma, PrismaClient} from '@prisma/client'

export default defineEventHandler(async (event) => {

    
    const prisma = new PrismaClient()
    const getBody = await readBody(event);

    const data = await prisma.category.findUnique({
        where: {
            id: getBody.id
        }
      
    })


    return data

})