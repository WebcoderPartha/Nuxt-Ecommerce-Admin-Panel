import { PrismaClient } from "@prisma/client"
import {getServerSession} from '#auth'

export default defineEventHandler(async (event) => {

    const prisma = new PrismaClient()
    const context = event.context.params
    const session = await getServerSession(event)

    if (session?.user?.role === 'customer') {

        const orderDetail = await prisma.order.findFirst({
            where: {
                userId: parseInt(session?.user?.id),
                tcn: context?.orderid
            },
            include:{
                orderdetail: true
            }
        })   
        
        return orderDetail

    } else {
        return {
            status: 'Unauthenticated',
            statusCode: 401
        }
    }


})