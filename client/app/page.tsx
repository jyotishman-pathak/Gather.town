"use client"

import { signIn } from 'next-auth/react'
import React from 'react'

const Home = () => {
  return (
    <div>
      <button onClick={()=>signIn()}>Sign IN</button>
    </div>
  )
}

export default Home
