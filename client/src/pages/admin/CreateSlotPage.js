import React from 'react'
import CreateSlots from '../../component/admin/createSlots/CreateSlots'
import Sidebar from '../../component/admin/sidebar/Sidebar'



export default function  CreateSlotPage() {
  return (
    <div className='flex'>
        <Sidebar/>
        <CreateSlots/>
        

    </div>
  )
}

