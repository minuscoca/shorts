"use client"

import Link from "next/link"

export default function Header() {
  return (
    <header className='absolute z-50 top-0 left-0 right-0 flex justify-between p-4'>
      <div />
      <nav className='flex'>
        <Link className="px-4 py-2" href='/following'>Following</Link>
        <Link className="px-4 py-2" href='/foryou'>For You</Link>
      </nav>
      <div />
    </header>
  )
}