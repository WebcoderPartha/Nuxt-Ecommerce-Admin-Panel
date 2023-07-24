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



    const getBody = await readBody(event);
    const prisma = new PrismaClient()

    const category = await prisma.product.delete({
        where: {
        id: getBody.id
        }
    })

    const data = {
        success: 'Data deleted successfully!'
    }

    return data

})