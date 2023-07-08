import {Prisma, PrismaClient} from '@prisma/client'

export default defineEventHandler(async (event) => {

    const getBody = await readBody(event);
    const prisma = new PrismaClient()

    const category = await prisma.category.create({
        data: {
            name: getBody.name
        }
    })

    const data = {
        success: 'Data inserted successfully!'
    }

    return data

})