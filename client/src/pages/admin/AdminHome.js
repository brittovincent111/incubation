import React from 'react'
import Sidebar from '../../component/admin/sidebar/Sidebar';
import AdminHome from '../../component/admin/home/Home'

function AdminHomePage() {
  return (
    <div className='flex'>
        <Sidebar/>
        <AdminHome/>
    </div>
  )
}

export default AdminHomePage ; 