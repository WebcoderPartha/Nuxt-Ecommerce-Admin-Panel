import { Prisma, PrismaClient } from "@prisma/client"
import {getServerSession} from '#auth'
import bcrypt from 'bcryptjs'

export default defineEventHandler(async (event) => {

    const session = await getServerSession(event)
    
    if(session?.user?.role == 'customer') {
        
        const prisma = new PrismaClient()
        const getBody = await readBody(event)
        const user = await prisma.user.findFirst({
            where: {
                id: 1
            }
        })
        
        const matchPassword = await bcrypt.compareSync(getBody?.old_password, user?.password)
        
        return matchPassword

    }else{

        return {
            status: 'Unauthenticated',
            statusCode: 401
        }

    }

    



})