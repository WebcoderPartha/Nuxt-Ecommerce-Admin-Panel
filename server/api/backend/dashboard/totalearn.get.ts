

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

    const orders = await prisma.order.findMany({
        where: {
           order_status: 3
        }
    })

    let price = 0;
    for (let i = 0; i < orders.length; i++) {
        price += parseInt(orders[i].total_price)
        
    }

    return {
        totalPrice: price
    }
})