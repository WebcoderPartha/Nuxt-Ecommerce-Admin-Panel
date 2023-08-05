import {Prisma, PrismaClient} from '@prisma/client'


export default defineEventHandler( async (event) => {


    const getBody = await readBody(event);
    const prisma = new PrismaClient()

    const category = await prisma.shipping.update({
        where: {
            userId: parseInt(getBody.userId)
        },
        data: {
            address_one: getBody.address_one,
            address_two: getBody.address_two,
            thana: getBody.thana,
            zipecode: getBody.zipecode,
            city: getBody.city,
            country: getBody.country,
        }
    })

    const data = {
        success: 'Data updated successfully!'
    }

    return data

})