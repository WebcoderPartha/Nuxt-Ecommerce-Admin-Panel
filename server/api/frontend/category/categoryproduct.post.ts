import {Prisma, PrismaClient} from '@prisma/client'

export default defineEventHandler(async (event) => {

    const prisma = new PrismaClient()
    const getBody = await readBody(event)

    // Get By Single Category
    const category = await prisma.category.findFirst({
        where: {
            slug: getBody?.slug 
        }
    })

    // Total Count 
    const totalCount = await prisma.product.aggregate({
        where: {
            categoryId: category?.id
        },
        _count: {
            categoryId: true
        }
    })
    const total = totalCount._count.categoryId 

    const products = await prisma.product.findMany({
        where: {
            categoryId:category?.id
        },
        skip: getBody?.skip,
        take: getBody?.take
    })


    return {
        products: products,
        total: total,
    };

})