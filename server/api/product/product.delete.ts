import {Prisma, PrismaClient} from '@prisma/client'

export default defineEventHandler(async (event) => {

    const getBody = await readBody(event);
    const prisma = new PrismaClient()

    const category = await prisma.product.delete({
        where: {
        id: getBody.id
        }
    })

    const data = {
        success: 'Data deleted successfully!'
    }

    return data

})