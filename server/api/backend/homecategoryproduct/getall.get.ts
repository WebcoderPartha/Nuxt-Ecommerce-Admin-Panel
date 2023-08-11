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

    const category = await prisma.category.findMany({
        orderBy:{
            id: "asc"
        }
    })

    const count = await prisma.category.aggregate({
        _count:{
            name: true
        }
    })

    return {
        categories:category,
        total: count._count.name
    }

})