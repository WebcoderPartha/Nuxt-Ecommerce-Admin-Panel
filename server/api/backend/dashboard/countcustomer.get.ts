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

    const count = await prisma.user.aggregate({
        where: {
            role: 'customer'
        },
        _count: {
            fullname: true
        }
    })


    return {
        customerCount: count._count.fullname
    }

})