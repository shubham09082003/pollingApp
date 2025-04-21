import React from 'react'
import { Link } from 'react-router-dom'
import { Button } from './ui/button'

function NavBar() {
  return (
    <div className='w-full shadow-lg shadow-white/10'>
        <div className='flex justify-between items-center w-7xl mx-auto p-4'>
            <div>
                <p className='text-2xl font-bold italic'>Polling App</p>
            </div>
            <div className='flex gap-4'>
                <Button variant="outline" className="bg-transparent text-white hover:bg-transparent hover:text-white cursor-pointer"><Link to="/login">Login</Link></Button>
                <Button variant="outline" className="bg-transparent text-white hover:bg-transparent hover:text-white cursor-pointer"><Link to="/signup">Signup</Link></Button>
            </div>
        </div>
    </div>
  )
}

export default NavBar