"use client"

import { SessionProvider } from 'next-auth/react'
import React from 'react'

const Provider = ({children}:{children: React.ReactNode}) => {
  return (
    <html lang="en">
    <body
      
    >
<SessionProvider>
{children}
</SessionProvider>
    
    </body>
  </html>
  )
}

export default Provider
