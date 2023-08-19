import moment from 'moment'
import { PrismaClient } from "@prisma/client";
import {getServerSession} from '#auth'
import SSLCommerzPayment from 'sslcommerz-lts'


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
            payment_status: "Unpaid",
            orderdetail: {
                create: details as any
            }
        }
    })


    const config = useRuntimeConfig()
    // SSLCommerz Payment

    const data = {
        total_amount: totalPrice,
        currency: 'BDT',
        tran_id: trans_id, // use unique tran_id for each api call
        success_url: `${config.public.baseurl}/success/${tracking_number}`,
        fail_url:  `${config.public.baseurl}/payment/fail/${tracking_number}`,
        cancel_url:  `${config.public.baseurl}/success/${tracking_number}/cancel`,
        ipn_url: `${config.public.baseurl}/success/${tracking_number}/ipn`,
        shipping_method: 'Courier',
        product_name: 'Ecommerce.',
        product_category: 'Electronic',
        product_profile: 'general',
        cus_name: 'Customer Name',
        cus_email: 'customer@example.com',
        cus_add1: 'Dhaka',
        cus_add2: 'Dhaka',
        cus_city: 'Dhaka',
        cus_state: 'Dhaka',
        cus_postcode: '1000',
        cus_country: 'Bangladesh',
        cus_phone: '01711111111',
        cus_fax: '01711111111',
        ship_name: 'Customer Name',
        ship_add1: 'Dhaka',
        ship_add2: 'Dhaka',
        ship_city: 'Dhaka',
        ship_state: 'Dhaka',
        ship_postcode: 1000,
        ship_country: 'Bangladesh',
    };

    // Get SSL Commerz Credentials 
    const ssl = await prisma.sslcommerz.findUnique({
        where: {
            id: 1
        }
    }) 
    const store_id = ssl?.store_id
    const store_passwd = ssl?.store_password
    const is_live = ssl?.sandbox === '1' ? true : false
    const sslcz = new SSLCommerzPayment(store_id, store_passwd, is_live)
    const paymentUrl = await sslcz.init(data)

    return {
        checkoutUrl: paymentUrl.GatewayPageURL
    }


  


    
 
  
  



})