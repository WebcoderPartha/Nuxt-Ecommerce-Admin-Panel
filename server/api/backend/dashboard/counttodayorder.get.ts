
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

    const todayOrderDate = moment().format('DD-MMM-Y')

    const count = await prisma.order.aggregate({
        where: {
           order_date: todayOrderDate
        },
        _count: {
            tcn: true
        }
    })


    return {
        todayOrderCount: count._count.tcn
    }

})