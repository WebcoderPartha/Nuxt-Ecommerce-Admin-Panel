import moment from 'moment'
import { PrismaClient } from "@prisma/client";
import {getServerSession} from '#auth'


export default defineEventHandler(async (event) => {
    
    const session = await getServerSession(event);
    if(session?.user?.role != 'customer'){
        return {
            status: 'Unauthenticated',
            statusCode: 401
        }
    }

    const prisma = new PrismaClient()
    const getBody = await readBody(event)
    const order = await prisma.order.deleteMany({
        where: {
            tcn: getBody?.tcn
        }
    })


    return {
        success: 'Transaction failed',
    }

  


    
 
  
  



})