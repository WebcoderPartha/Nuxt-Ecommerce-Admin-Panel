import {Prisma, PrismaClient} from '@prisma/client'

export default defineEventHandler(async (event) => {

    const getBody = await readBody(event);
    const prisma = new PrismaClient()

    const admin = await prisma.user.create({
        data: {
            fullname: getBody.name,
            email: getBody.email,
            username:getBody.email,
            password: getBody.password,
            role: "admin"
        }
    })

    const data = {
        success: 'Data inserted successfully!'
    }

    return data
    sendRedirect

})