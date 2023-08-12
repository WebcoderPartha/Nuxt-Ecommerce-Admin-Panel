
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
    const allOrder = await prisma.order.findMany({
        take: getBody?.take,
        skip: getBody?.skip, 
        include: {
            orderdetail: true,
            user: true
        },
        orderBy: {
            id: "desc"
        }
    })

    // total Order Count
    const todayOrderCount = await prisma.order.aggregate({
        _count: {
           tcn: true
        }
    })

    return {
        todayOrders: allOrder,
        total: todayOrderCount._count.tcn
    }

})