import React from 'react'

export default function RightsReservedMessage() {
  return (
    <div className='text-sm text-neutral-400 text-center block'>
        © {new Date().getFullYear()} Pass Gallery. All rights reserved.
    </div>
  )
}
