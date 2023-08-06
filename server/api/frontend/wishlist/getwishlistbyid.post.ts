import {Prisma, PrismaClient} from '@prisma/client'

import {getServerSession} from '#auth'

export default defineEventHandler( async (event) => {

    const session = await getServerSession(event);

    if(session?.user?.role === 'customer'){
        const getBody = await readBody(event);
        const prisma = new PrismaClient()
    
        const product = await prisma.wishlist.findFirst({
            where: {
                productId: parseInt(getBody?.product_id),
                userId: parseInt(session?.user?.id)
            }
        })
    
        const data = {
            success: 'Data inserted successfully!'
        }
    
        return data
        
    }else{

        return {
            status: 'Unauthenticated',
            statusCode: 401
        }
    }

 

})