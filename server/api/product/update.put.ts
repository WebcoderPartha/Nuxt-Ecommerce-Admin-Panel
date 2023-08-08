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

    // Delete exist product gallery
    const deleteExistGalary = await prisma.gallery.deleteMany({
        where: {
            productId: parseInt(getBody?.id)
        }
    })

    if (deleteExistGalary) {

        
        const images:any[] = []
        const getimages = getBody.images
        // Making array push 
        getimages.forEach((item:any) => {
            images.push({
                image: item.image
            })
        })
    
        const productupdate = await prisma.product.update({
            where: {
                id: parseInt(getBody.id)
            },
            data: {
                name : getBody.name,
                regular_price : getBody.regular_price,
                discount : getBody.discount,
                discount_price : getBody.discount_price,
                quantity : getBody.quantity,
                image : getBody?.images[0].image,
                categoryId: parseInt(getBody.categoryId),
                gallery: {
                    create: images as any
                }
            }
        })
    
        const data = {
            success: 'Data updated successfully!'
        }
    
        return data
    }


})