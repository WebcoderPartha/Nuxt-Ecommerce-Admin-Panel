import {Prisma, PrismaClient} from '@prisma/client'

export default defineEventHandler(async (event) => {

    const prisma = new PrismaClient()
    const getBody = await readBody(event)
    const shipaddress = await prisma.shipping.create({
        data: {
            address_one: getBody.address_one,
            address_two: getBody.address_two,
            thana: getBody.thana,
            zipecode: getBody.zipecode,
            city: getBody.city,
            country: getBody.country,
            userId: parseInt(getBody.userId)
        }
    })

    return {
        success: 'Shipping address is saved'
    }

})