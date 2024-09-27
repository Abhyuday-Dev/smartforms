import { Button } from '@/components/ui/button'
import React from 'react';
import CreateForm from "./_components/CreateForm";

const Dashboard = () => {
  return (
    <div className='p-10'>
      <h2 className='text-3xl font-bold flex items-center justify-between'>Dashboard
       <CreateForm />
      </h2>
    </div>
  )
}

export default Dashboard