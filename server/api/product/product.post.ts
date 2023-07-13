import {Prisma, PrismaClient} from '@prisma/client'

export default defineEventHandler(async (event) => {

    const getBody = await readBody(event);
    const prisma = new PrismaClient()

    const product = await prisma.product.create({
       data: {
        name : getBody.name,
        regular_price : getBody.regular_price,
        discount : getBody.discount,
        discount_price : getBody.discount_price,
        quantity : getBody.quantity,
        image : getBody.image,
        categoryId: getBody.category_id
       }
    })

    const data = {
        success: 'Data inserted successfully!'
    }

    return data

})