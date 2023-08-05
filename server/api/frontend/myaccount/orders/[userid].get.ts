import { Prisma, PrismaClient } from "@prisma/client"
import {getServerSession} from '#auth'

export default defineEventHandler(async (event) => {

    const session = await getServerSession(event)
    
    if(session?.user?.role == 'customer') {
        
        const prisma = new PrismaClient()
        const content =  event.context.params
    
        const orders = await prisma.order.findMany({
            where: {
                userId: parseInt(content?.userid)
            },
            include: {
                orderdetails: true
            },
            orderBy: {
                order_date: "desc"
            }
        })
        
        return orders

    }else{

        return {
            status: 'Unauthenticated',
            statusCode: 401
        }

    }

    



})