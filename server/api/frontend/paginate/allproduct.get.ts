import { Prisma, PrismaClient } from "@prisma/client"

export default defineEventHandler(async (event) => {

    const prisma = new PrismaClient()
    // const productid = event.context.params?.productid

    const product = await prisma.product.aggregate({
        _count:{
            name: true
        }
    })

    

    return product

})