"use client"

import { useSession } from 'next-auth/react'
import React from 'react'

const gatherPlayground = () => {
 const {data:session,status} = useSession();
 
 
  return (
    <div>
      hii  {session?.user?.email}
    </div>
  )
}

export default gatherPlayground
