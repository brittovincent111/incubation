import React from 'react'

import Sidebar from '../../component/admin/sidebar/Sidebar'
import Slot from '../../component/admin/slots/Slot'

function SlotPage() {
  return (
    <div className='flex'>
        <Sidebar/>
        <Slot/>
    </div>
  )
}

export default SlotPage