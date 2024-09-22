import React from 'react'
import { Link, Outlet } from 'react-router-dom'

const Global = () => {
    return (
        <div className='flex flex-col h-[100vh]'>
            <header className='flex w-full justify-between px-2'>
                <Link to="/">
                    <h1 className='text-[2rem] text-[#e1b43c]'>Movie List</h1>
                </Link>
                <Link to="/">Home</Link>
            </header>
            <Outlet />
        </div>
    )
}

export default Global