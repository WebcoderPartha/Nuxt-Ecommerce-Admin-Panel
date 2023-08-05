import { Prisma, PrismaClient } from "@prisma/client"

export default defineEventHandler(async (event) => {

    const prisma = new PrismaClient()
    const content =  event.context.params

    const orders = await prisma.order.findMany({
        where: {
            userId: parseInt(content?.userid)
        },
        include: {
            orderdetails: true
        }
    })
    
    return orders



})