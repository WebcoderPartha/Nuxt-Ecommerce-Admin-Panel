import { Prisma, PrismaClient } from "@prisma/client"
import {getServerSession} from '#auth'

export default defineEventHandler(async (event) => {

    const session = await getServerSession(event)
    
    if(session?.user?.role == 'customer') {
        
        const prisma = new PrismaClient()
        const getBody =  await readBody(event)

        const updateImage = await prisma.user.update({
            where: {
                id: parseInt(session?.user?.id)
            },
            data: {
                image: getBody?.image
            }
        })
        
        return {
            success: 'Profile image updated'
        }

    }else{

        return {
            status: 'Unauthenticated',
            statusCode: 401
        }

    }

    



})