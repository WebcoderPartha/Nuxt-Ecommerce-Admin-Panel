import {Prisma, PrismaClient} from '@prisma/client'

export default defineEventHandler(async (event) => {

    const getBody = await readBody(event);
    
    const prisma = new PrismaClient()

    const admin = await prisma.category.update({
        where: {
            id: getBody.id
        },
        data: {
            name: getBody.name
        }
    })

    const data = {
        success: 'Data updated successfully!'
    }

    return data

})