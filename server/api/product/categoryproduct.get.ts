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

    const data = await prisma.category.findMany({
        where: {
            id: 4
        },
        include: {
            products: true
        }
       
    })


    return data

})