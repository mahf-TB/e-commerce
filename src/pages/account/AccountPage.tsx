import StatisticGrid from '@/components/statistic-grid';
import CommandeRecentes from '@/features/orders/CommandeRecents';
import React from 'react'

const AccountPage = () => {
  const myStats = [  ];
  return (
    <div className='space-y-4'>
      <StatisticGrid  className='p-0 lg:p-0' />
      <div className='flex gap-3'>
        <div className=' w-3/4'>
        <CommandeRecentes />
        </div>
        <div className='bg-blue-100 w-2/4'>fze</div>
      </div>
    </div>
  )
}

export default AccountPage