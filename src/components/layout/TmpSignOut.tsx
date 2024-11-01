'use client'

import React from 'react'
import { Button } from '../ui/button'
import browserClient from '@/utils/supabase/client'

const TmpSignOut = () => {

  return (
    <Button onClick={() => {
      browserClient.auth.signOut()
    }}>로그아웃</Button>
  )
}

export default TmpSignOut