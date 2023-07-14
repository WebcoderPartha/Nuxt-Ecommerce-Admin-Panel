import {Prisma, PrismaClient} from '@prisma/client'

export default defineEventHandler(async (event) => {

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

    return getBody

})