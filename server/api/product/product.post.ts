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

    const getBody = await readBody(event);
    const prisma = new PrismaClient()

    const images:any[] = []
    const getimages = getBody.images
    // Making array push 
    getimages.forEach((item:any) => {
        images.push({
            image: item.image
        })
    })


    const product = await prisma.product.create({
       data: {
        name : getBody.name,
        regular_price : getBody.regular_price,
        discount : getBody.discount,
        discount_price : getBody.discount_price,
        quantity : getBody.quantity,
        slug:getBody.slug,
        categoryId: getBody.category_id,
        image: getBody.images[0].image,
        gallery: {
            create: images as any
        }
       }
    })

    const data = {
        success: 'Data inserted successfully!'
    }

    return data

})