import React from 'react'
import Dropdown from '@/components/Dropdown/Page'
import { IoIosArrowDown } from 'react-icons/io';
const Women = (products:any) => {
  const [open, setOpen] = React.useState(false);
  const handleClick = () => {
    setOpen(!open);
  }
  return (
    <div>
      
        <button className='flex items-center' onClick={handleClick}>Women
          <IoIosArrowDown />
        </button>
        {open && <Dropdown products1={products}/>}
    </div>
  )
}

export default Women