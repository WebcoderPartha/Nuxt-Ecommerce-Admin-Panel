
import {Prisma, PrismaClient} from '@prisma/client'
import {getServerSession} from '#auth'

export default defineEventHandler( async (event) => {

    const session = await getServerSession(event);

    if(session?.user?.role != 'admin'){
        return {
            status: 'Unauthenticated',
            statusCode: 401
        }
    }

    const prisma = new PrismaClient()
    const getBody = await readBody(event)

    // Get All Orders
    const sslcommerz = await prisma.sslcommerz.update({
        where: {
            id: 1
        },
        data: {
            store_id: getBody?.store_id,
            store_password: getBody?.store_password
        }
    })


    return {
        success: 'SSLCommerz setting updated'
    }

})

   