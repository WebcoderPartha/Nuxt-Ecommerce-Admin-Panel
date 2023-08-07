import { Prisma, PrismaClient } from "@prisma/client"
import {getServerSession} from '#auth'

export default defineEventHandler(async (event) => {

    const session = await getServerSession(event)
    
    if(session?.user?.role == 'customer') {
        
        const prisma = new PrismaClient()
  
        const getUser = await prisma.user.findUnique({
            where: {
                id: parseInt(session?.user?.id)
            }
        })
        
        return getUser

    }else{

        return {
            status: 'Unauthenticated',
            statusCode: 401
        }

    }

    



})