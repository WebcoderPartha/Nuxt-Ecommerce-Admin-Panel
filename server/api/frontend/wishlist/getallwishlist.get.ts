import {Prisma, PrismaClient} from '@prisma/client'

import {getServerSession} from '#auth'

export default defineEventHandler( async (event) => {

    const session = await getServerSession(event);

    if(session?.user?.role === 'customer'){
        
        const getBody = await readBody(event);
        const prisma = new PrismaClient()
    
        const allWishlist = await prisma.wishlist.findMany({
            where: {
                userId: parseInt(session?.user?.id)
            },
            include: {
                product: true
            }
        })
    
        return allWishlist
        
    }else{

        return {
            status: 'Unauthenticated',
            statusCode: 401
        }
    }

 

})