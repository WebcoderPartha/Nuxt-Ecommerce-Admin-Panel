import {Prisma, PrismaClient} from '@prisma/client'

import {getServerSession} from '#auth'

export default defineEventHandler( async (event) => {

    const session = await getServerSession(event);

    if(session?.user?.role === 'customer'){
        const getBody = await readBody(event);
        const prisma = new PrismaClient()
    
        const existProduct = await prisma.wishlist.delete({
            where: {
                productId: parseInt(getBody?.product_id),
                userId: parseInt(session?.user?.id)
            }
        })
    
        return {
            success: 'Removed from wishlist'
        }
        
    }else{

        return {
            status: 'Unauthenticated',
            statusCode: 401
        }
    }

 

})