import React from 'react'
import Link from 'next/link'
function Navbar() {
  return (
    <nav className="flex justify-between items-center bg-emerald-300 px-8 py-3">
        <Link className=" text-green-50 font-bold" href={"/"}>My To-Do List</Link>
        <Link className="bg-emerald-400 hover:bg-emerald-500 text-green-50 font-bold py-2 px-4 rounded-full" href={"/addTopic"}>Add Topic</Link>
    </nav>
  )
}

export default Navbar