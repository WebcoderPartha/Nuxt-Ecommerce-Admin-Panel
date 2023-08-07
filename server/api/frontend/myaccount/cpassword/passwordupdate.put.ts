import { Prisma, PrismaClient } from "@prisma/client"
import {getServerSession} from '#auth'
import bcrypt from 'bcryptjs'

export default defineEventHandler(async (event) => {

    const session = await getServerSession(event)
    
    if(session?.user?.role === 'customer') {
        
        const prisma = new PrismaClient()
        const getBody = await readBody(event)
        const hashPassword =  await bcrypt.hashSync(getBody.password, 10)
        const user = await prisma.user.update({
            where: {
                id: parseInt(session?.user?.id),
            },
            data: {
                password: hashPassword
            }
        })
        
        
        return {
            success: 'Password has been update'
        }

    }else{

        return {
            status: 'Unauthenticated',
            statusCode: 401
        }

    }

    



})