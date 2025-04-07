import Dropdown from '@/components/Dropdown/Page'
import React from 'react'
import { IoIosArrowDown } from 'react-icons/io';

const Men = () => {
  const [open, setOpen] = React.useState(false);
  const handleClick = () => {
    setOpen(!open);
  }
  return (
    <div>
      
        <button className='flex items-center' onClick={handleClick}>Men
        <IoIosArrowDown />
        </button>
        {open && <Dropdown  />}
    </div>
  )
}

export default Men