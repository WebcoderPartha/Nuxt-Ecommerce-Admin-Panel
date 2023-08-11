import {Prisma, PrismaClient} from '@prisma/client'

export default defineEventHandler(async (event) => {

    const prisma = new PrismaClient()
    const getBody = await readBody(event)

    const products = await prisma.category.findFirst({
        where: {
            slug: getBody.slug 
        },
        skip: getBody?.skip,
        take: getBody?.take,
        include: {
            product:true
        }
    })

    // Total Count 
    const totalCount = await prisma.product.aggregate({
        where: {
            categoryId: products?.id
        },
        _count: {
            categoryId: true
        }
    })

    const total = totalCount._count.categoryId 


    return {
        products: products,
        total: total
    };

})