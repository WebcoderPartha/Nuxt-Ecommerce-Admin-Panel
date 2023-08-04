import {Prisma, PrismaClient} from '@prisma/client'


export default defineEventHandler( async (event) => {


    const getBody = await readBody(event);
    const prisma = new PrismaClient()

    const category = await prisma.shipping.create({
        data: {
            address_one: getBody.address_one,
            address_two: getBody.address_two,
            thana: getBody.thana,
            zipecode: getBody.zipecode,
            city: getBody.city,
            country: getBody.country,
            userId: getBody.userId,
        }
    })

    const data = {
        success: 'Data inserted successfully!'
    }

    return data

})