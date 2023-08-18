import moment from 'moment'
import { PrismaClient } from "@prisma/client";
import {getServerSession} from '#auth'


export default defineEventHandler(async (event) => {
    
    const session = await getServerSession(event);
    if(session?.user?.role != 'customer'){
        return {
            status: 'Unauthenticated',
            statusCode: 401
        }
    }

    const prisma = new PrismaClient()
    const getBody = await readBody(event)
    const paid = await prisma.order.updateMany({
        where: {
            tcn: getBody?.tcn,
            payment_method: 'SSLCommerz'
        },
        data: {
            payment_status: 'Paid'
        }
    })

    return {
        payment: 'paid'
    }

})