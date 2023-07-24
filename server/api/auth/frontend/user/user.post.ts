import {Prisma, PrismaClient} from '@prisma/client'

export default defineEventHandler(async (event) => {

    const getBody = await readBody(event);
    const prisma = new PrismaClient()

    const admin = await prisma.user.create({
        data: {
            fullname: getBody.fullname,
            email: getBody.email,
            username:getBody.username,
            password: getBody.password,
            role: "customer"
        }
    })

    const data = {
        success: 'Signup successfully!'
    }

    return data

})