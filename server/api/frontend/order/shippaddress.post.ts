import {Prisma, PrismaClient} from '@prisma/client'
import {getServerSession} from '#auth'

export default defineEventHandler( async (event) => {

    const session = await getServerSession(event);

    if(session?.user?.role != 'customer'){
        return {
            status: 'Unauthenticated',
            statusCode: 401
        }
    }

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