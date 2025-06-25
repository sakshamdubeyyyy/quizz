import React from 'react'

const AdminSettings = () => {
  return (
    <div>
      Your IP address: <span className='font-bold'>{localStorage.getItem("ip")}</span>
    </div>
  )
}

export default AdminSettings
