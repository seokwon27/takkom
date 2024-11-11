import { getUser } from '@/api/userApi';
import LikeList from '@/components/like/LikeList';
import { createClient } from '@/utils/supabase/server';
import React from 'react'

type LikePageParams = {searchParams: {pageNo: string}}

const LikePage = async ({searchParams}: LikePageParams) => {
  const currentPage = Number(searchParams.pageNo);
  const supabaseClient = createClient();
  const user = await getUser(supabaseClient);



  return (
    <div className='w-full max-w-[792px] grow mx-auto'>
      <LikeList currentPage={currentPage} user={user}/>
    </div>
  )
}

export default LikePage