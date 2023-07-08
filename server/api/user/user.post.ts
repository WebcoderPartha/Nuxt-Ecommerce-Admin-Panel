import {Prisma, PrismaClient} from '@prisma/client'

export default defineEventHandler(async (event) => {

    const getBody = await readBody(event);
    const prisma = new PrismaClient()

    const user = await prisma.user.create({
        data: {
            name: getBody.name,
            email: getBody.email,
            password: getBody.password
        }
    })

    const data = {
        success: 'Data inserted successfully!'
    }

    return data

})