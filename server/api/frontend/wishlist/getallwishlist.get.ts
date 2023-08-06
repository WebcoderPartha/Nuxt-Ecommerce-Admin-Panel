import {Prisma, PrismaClient} from '@prisma/client'

import {getServerSession} from '#auth'

export default defineEventHandler( async (event) => {

    const session = await getServerSession(event);

    if ( session?.user?.role === 'customer' ) {

        const prisma = new PrismaClient()
    
        const allWishlist = await prisma.wishlist.findMany({
            where: {
                userId: 1
            },
            include: {
                product: true
            }
        })
    
        return allWishlist

    } else {
        const data = {
            status: 'Unauthenticated',
            statusCode: 401
        }

        return data
    }


   

 

})