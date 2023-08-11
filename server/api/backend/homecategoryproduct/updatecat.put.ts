import {Prisma, PrismaClient} from '@prisma/client'

import {getServerSession} from '#auth'

export default defineEventHandler( async (event) => {

    const session = await getServerSession(event);

    if(session?.user?.role != 'admin'){
        return {
            status: 'Unauthenticated',
            statusCode: 401
        }
    }

    const prisma = new PrismaClient()
    const getBody = await readBody(event)

    for (let i = 0; i < getBody?.categories.length; i++) {
       
        const category = await prisma.category.findUnique({
            where: {
                id: getBody?.categories[i].categoryId
            }
        })

        if(category?.homecategory === 0){

            const updateCategory = await prisma.category.update({
                where: {
                    id: category?.id
                },
                data: {
                    homecategory: 1
                }
            })

        }else{

            const updateCategory = await prisma.category.update({
                where: {
                    id: category?.id
                },
                data: {
                    homecategory: 0
                }
            })

        }
        
    }

    return {
        success: 'Data updated successfully!'
    }

})