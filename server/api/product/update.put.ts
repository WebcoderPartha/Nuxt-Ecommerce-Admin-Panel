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

    const productupdate = await prisma.product.update({
        where: {
            id: parseInt(getBody.id)
        },
        data: {
            name : getBody.name,
            regular_price : getBody.regular_price,
            discount : getBody.discount,
            discount_price : getBody.discount_price,
            quantity : getBody.quantity,
            image : getBody?.image,
            categoryId: parseInt(getBody.categoryId)
        }
    })

    const data = {
        success: 'Data updated successfully!'
    }

    return data

})