import CredentialsProvider from 'next-auth/providers/credentials'
import { NuxtAuthHandler } from '#auth'
import {PrismaClient} from '@prisma/client'


export default NuxtAuthHandler({
    pages: {
    
        signIn: '/login'
      },
    providers: [
        // @ts-expect-error You need to use .default here for it to work during SSR. May be fixed via Vite at some point
    CredentialsProvider.default({
      
        async authorize (credentials: any) {
          
            const prisma = new PrismaClient()
            const loggInUser = await prisma.user.findFirst({
                where: {
                    email: credentials?.username,
                    password:credentials?.password
                }
            })
            return loggInUser;
        //   if (credentials?.username === user.username && credentials?.password === user.password) {
       
        //     return user
        //   } else {
     
      
        //     return null
     
        //   }
        }
      })
    ]
})