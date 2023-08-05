import {Prisma, PrismaClient} from '@prisma/client'
import {getServerSession} from '#auth'

export default defineEventHandler( async (event) => {

    const session = await getServerSession(event)

    if(session?.user?.role === 'customer'){
        const getBody = await readBody(event);
        const prisma = new PrismaClient()
    
        const category = await prisma.shipping.update({
            where: {
                userId: parseInt(getBody.userId)
            },
            data: {
                address_one: getBody.address_one,
                address_two: getBody.address_two,
                thana: getBody.thana,
                zipecode: getBody.zipecode,
                city: getBody.city,
                country: getBody.country,
            }
        })
    
        const data = {
            success: 'Data updated successfully!'
        }
    
        return data

    }else{
        
        return {
                    status: 'Unauthenticated',
                    statusCode: 401
                }

    }


})