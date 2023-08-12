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

    const order = await prisma.order.findFirst({
        where: {
            tcn: getBody.orderid
        }
    })

    return order

})