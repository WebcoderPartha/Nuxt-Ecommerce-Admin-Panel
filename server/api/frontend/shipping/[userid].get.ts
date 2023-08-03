import {Prisma, PrismaClient} from '@prisma/client'


export default defineEventHandler( async (event) => {


    const context = event.context.params 
    const prisma = new PrismaClient()

    const shippingAddress = await prisma.shipping.findFirst({
        where: {
            userId: parseInt(context?.userid)
        }
    })

    
    return shippingAddress

})