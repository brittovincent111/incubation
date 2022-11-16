import React from 'react'
import Progress from '../../component/admin/progress/Progress'
import Sidebar from '../../component/admin/sidebar/Sidebar'


function ProgressPage() {
  return (
    <div className='flex'>
        <Sidebar/>
      <Progress/>
    </div>
  )
}

export default ProgressPage