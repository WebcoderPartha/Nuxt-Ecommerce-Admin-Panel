import {Prisma, PrismaClient} from '@prisma/client'

export default defineEventHandler(async (event) => {

    const getBody = await readBody(event);
    const prisma = new PrismaClient()

    const product = await prisma.product.update({
        where: {
            id: getBody.id
        },
        data: {
            name : getBody.name,
            regular_price : getBody.regular_price,
            discount : getBody.discount,
            discount_price : getBody.discount_price,
            quantity : getBody.quantity,
            image : getBody.image,
            categoryId: getBody.categoryId
       }
    })

    const data = {
        success: 'Data updated successfully!'
    }

    return data

})