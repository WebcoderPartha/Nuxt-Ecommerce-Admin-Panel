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
    const allProduct = getBody.carts
    const payment_method = getBody.payment_method
    const order_date = moment().format('DD-MMM-Y')
    const tracking_number = "WC"+ (new Date()).getTime()
    const trans_id = Math.random().toString(16).slice(2)
    let totalPrice = 0
    let totalQty = 0
    

    // Typescript array  like - product:any[] = []
    const details:any[] = []
    allProduct.forEach((cart:any) =>{
        totalPrice += parseInt(cart.total)
        totalQty += parseInt(cart.quantity)
        let pt = {
            product_name: cart.name,
            image: cart.image,
            quantity: `${cart.quantity}`,
            price: `${cart.price}`,
            subtotal: `${cart.total}`,  
        }
        details.push(pt)
    })
    

    const product = allProduct.map((item:any )=> {
        return {
            name: item.name,
            image: item.image,
            quantity: item.quantity,
            price: item.price,
            total: item.total,  
        }
    })


    const oderDone = await prisma.order.create({
        data: {
            userId: getBody.userId,
            tcn: tracking_number,
            quantity: `${totalQty}`,
            total_price: `${totalPrice}`,
            payment_method: payment_method,
            order_date: order_date,
            tran_id: trans_id,
            order_status: 1,
            orderdetail: {
                create: details as any
            }
        }
    })


    return {
        success: 'The order has been placed',
        order: oderDone
      
    }

  


    
 
  
  



})