import CredentialsProvider from 'next-auth/providers/credentials'
import { NuxtAuthHandler } from '#auth'

export default NuxtAuthHandler({
    pages: {
    
        signIn: '/login'
      },
    providers: [
        // @ts-expect-error You need to use .default here for it to work during SSR. May be fixed via Vite at some point
    CredentialsProvider.default({
      
        authorize (credentials: any) {
          
          const user = { id: '1', name: 'J Smith', username: 'jsmith', password: 'hunter2' }
          if (credentials?.username === user.username && credentials?.password === user.password) {
       
            return user
          } else {
     
      
            return null
     
          }
        }
      })
    ]
})