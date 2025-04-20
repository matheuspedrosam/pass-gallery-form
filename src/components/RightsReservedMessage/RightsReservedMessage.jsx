import React from 'react'

export default function RightsReservedMessage() {
  return (
    <div className='fixed bottom-2 text-sm text-neutral-400 text-center w-full'>
        © {new Date().getFullYear()} Pass Gallery. All rights reserved.
    </div>
  )
}
