
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

    // Get Today Orders
    const getOrderById = await prisma.order.update({
        where: {
           id: getBody?.id
        },
        data: {
            order_status: parseInt(getBody?.order_status)
        }
    })

    return {
        success: "Updated order status"
    }

})