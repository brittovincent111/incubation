import React from 'react'
import Reject from '../../component/admin/reject/Reject'
import Sidebar from '../../component/admin/sidebar/Sidebar'


export default function RejectPage() {
    return (
        <div className='flex'>
            <Sidebar />
            <Reject />
        </div>
    )
}

