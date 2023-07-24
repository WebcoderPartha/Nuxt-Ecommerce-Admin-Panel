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

    const getBody = await readBody(event);

    const data = await prisma.product.findFirst({
        where: {
            id: parseInt(getBody.id)
        },
        include: {
            category: true
        }
    })

    return data;

})