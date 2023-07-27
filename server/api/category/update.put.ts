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

    const admin = await prisma.category.update({
        where: {
            id: getBody.id
        },
        data: {
            name: getBody.name,
            slug: getBody.slug
        }
    })

    const data = {
        success: 'Data updated successfully!'
    }

    return data

})