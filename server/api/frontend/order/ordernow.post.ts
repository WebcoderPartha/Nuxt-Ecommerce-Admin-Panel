import moment from 'moment'
import { PrismaClient } from "@prisma/client";


export default defineEventHandler(async (event) => {

    const prisma = new PrismaClient()
    const getBody = await readBody(event)
    // const allProduct = getBody.carts
    // const payment_method = getBody.payment_method
    // const order_date = moment().format('DD-MMM-Y')
    // const tracking_number = "WC"+ (new Date()).getTime()
    // const trans_id = Math.random().toString(16).slice(2)
    // let totalPrice = 0
    // let totalQty = 0
    // allProduct.forEach((cart:any) =>{
    //     totalPrice += parseInt(cart.total)
    //     totalQty += parseInt(cart.quantity)
    // })
    

    // const OrderDetail = allProduct.map((item:any )=> {
    //     return {
    //         name: item.name,
    //         image: item.image,
    //         quantity: item.quantity,
    //         price: item.price,
    //         total: item.total,  
    //     }
    // })

    // const order = await prisma.order.create({
    //     data: {
    //         userId:2, 
    //         quantity  :   '1',
    //         total_price:  '1',
    //         payment_method :  '1',
    //         order_date :  '1',
    //         tran_id     :  '1',
    //         order_status :  '1'
        
            
    //     }
    // })

    return {
        success: 'Your order has been placed'
    }

    
 
  
  



})