'use client'
import React, { useState, useRef, useEffect } from 'react'
import { IoIosArrowDown } from 'react-icons/io'

const items = {
  Men: ['Alice', 'Bob', 'Charlie'],
  Women: ['Laptop', 'Phone', 'Tablet'],
}

const Dropdown = ({ category }: { category: 'Men' | 'Women' }) => {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

 const handleClick = () =>{
  setOpen(!open)
 }
  useEffect(() => {
    const close = (e: MouseEvent) => !ref.current?.contains(e.target as Node) && setOpen(false)
    document.addEventListener('mousedown', close)
    return () => document.removeEventListener('mousedown', close)
  }, [])

  return (
    <div ref={ref}       >
      <button onClick={handleClick} className="flex items-center">
        {category} <IoIosArrowDown />
      </button>
      {open && (
        <ul className="absolute mt-2 w-40 bg-white shadow z-50 rounded">
          {items[category].map((name, i) => (
            <li key={i} className="p-2 cursor-pointer">{name}</li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default Dropdown
