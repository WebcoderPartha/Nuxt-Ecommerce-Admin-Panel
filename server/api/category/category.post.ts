import {Prisma, PrismaClient} from '@prisma/client'

import {getServerSession} from '#auth'

export default defineEventHandler( async (event) => {

    const session = await getServerSession(event);

    if(!session){
        return {
            status: 'Unauthenticated',
            statusCode: 401
        }
    }

    const getBody = await readBody(event);
    const prisma = new PrismaClient()

    const category = await prisma.category.create({
        data: {
            name: getBody.name,
            slug: getBody.slug,
            image: getBody.image
        }
    })

    const data = {
        success: 'Data inserted successfully!'
    }

    return data

})