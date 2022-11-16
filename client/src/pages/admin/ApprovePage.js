import React from 'react'
import Approved from '../../component/admin/approved/Approved'
import Sidebar from '../../component/admin/sidebar/Sidebar'

export default function ApprovePage() {
  return (
    <div className='flex'>
        <Sidebar/>
        <Approved/>
    </div>
  )
}

