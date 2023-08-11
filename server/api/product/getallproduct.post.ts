import {Prisma, PrismaClient} from '@prisma/client'

import {getServerSession} from '#auth'

export default defineEventHandler( async (event) => {

    const session = await getServerSession(event);
    const getBody = await readBody(event)

    if(session?.user?.role != 'admin'){
        return {
            status: 'Unauthenticated',
            statusCode: 401
        }
    }

   
    const prisma = new PrismaClient()

    const products = await prisma.product.findMany({
        orderBy: {
            id: 'desc'
        },
        include: {
            category: true,
            gallery: true
        },
        take: getBody?.take,
        skip: getBody?.skip
       
    })

    const count = await prisma.product.aggregate({
        _count:{
            name: true
        }
    })

    return {
        products: products,
        total: count._count.name
    }

})