import {Prisma, PrismaClient} from '@prisma/client'
import {getServerSession} from '#auth'

export default defineEventHandler( async (event) => {

    const session = await getServerSession(event)
    if(session?.user?.role === 'customer'){

        const context = event.context.params 
        const prisma = new PrismaClient()
    
        const shippingAddress = await prisma.shipping.findFirst({
            where: {
                userId: parseInt(context?.userid)
            }
        })
    
        return shippingAddress

    }else{

        return {
            status: 'Unauthenticated',
            statusCode: 401
        }
    }


})