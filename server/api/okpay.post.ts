import SSLCommerzPayment from 'sslcommerz-lts'
import { PrismaClient } from '@prisma/client';

export default defineEventHandler( async (event) => {


    const data = {
        total_amount: 100,
        currency: 'BDT',
        tran_id: 'REF123', // use unique tran_id for each api call
        success_url: 'http://localhost:3030/success',
        fail_url: 'http://localhost:3030/fail',
        cancel_url: 'http://localhost:3030/cancel',
        ipn_url: 'http://localhost:3030/ipn',
        shipping_method: 'Courier',
        product_name: 'Computer.',
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

    const prisma = new PrismaClient()
    const ssl = await prisma.sslcommerz.findUnique({
        where: {
            id: 1
        }
    }) 
    const store_id = ssl?.store_id
    const store_passwd = ssl?.store_password
    const is_live = ssl?.sandbox === '1' ? true : false``
    const sslcz = new SSLCommerzPayment(store_id, store_passwd, is_live)
    return sslcz.init(data)
    // const ok =   sslcz.init(data)
    // return ok



})