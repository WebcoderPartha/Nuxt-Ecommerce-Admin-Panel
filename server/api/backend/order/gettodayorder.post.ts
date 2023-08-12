
import moment from 'moment'
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

    // Today date format
    const todayOrderDate = moment().format('DD-MMM-Y')

    // Get Today Orders
    const todayOrder = await prisma.order.findMany({
        where: {
           order_date: todayOrderDate
        },
        include: {
            orderdetail: true,
            user: true
        },
        orderBy: {
            id: "desc"
        },
        take: getBody?.take,
        skip: getBody?.skip, 
    })

    // Today Order total Count
    const todayOrderCount = await prisma.order.aggregate({
        where: {
           order_date: todayOrderDate
        },
        _count: {
           tcn: true
        }
    })

    return {
        todayOrders: todayOrder,
        total: todayOrderCount._count.tcn
    }

})