import React from 'react'

const UserSettings = () => {
  return (
    <div>
      Your IP address: <span className='font-bold'>{localStorage.getItem("ip")}</span>
    </div>
  )
}

export default UserSettings
