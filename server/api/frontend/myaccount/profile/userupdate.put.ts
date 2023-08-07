import { Prisma, PrismaClient } from "@prisma/client"
import {getServerSession} from '#auth'

export default defineEventHandler(async (event) => {

    const session = await getServerSession(event)
    const getBody = await readBody(event)
    
    if(session?.user?.role == 'customer') {
        
        const prisma = new PrismaClient()
  
        const getUser = await prisma.user.update({
            where: {
                id: parseInt(session?.user?.id)
            },
            data: {
                fullname: getBody?.fullname,
                email: getBody?.email
            }
        })
        
        return {
            success: 'Profile updated successfully'
        }

    }else{

        return {
            status: 'Unauthenticated',
            statusCode: 401
        }

    }

    



})