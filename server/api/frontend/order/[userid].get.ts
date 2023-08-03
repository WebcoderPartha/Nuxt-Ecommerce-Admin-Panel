import {Prisma, PrismaClient} from '@prisma/client'


export default defineEventHandler( async (event) => {


    const context = event.context.params 
    const prisma = new PrismaClient()

    const shippingAddress = await prisma.user.findFirst({
        where: {
            id: parseInt(context?.userid)
        },
        include: {
            shipping: true
        }
    })

    
    return shippingAddress

})