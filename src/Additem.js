import React from 'react'
import { FaPlus } from 'react-icons/fa'
import { useRef } from 'react'

const Additem = ({newItem,setNewItem,handleSubmit}) => {

  const inputRef =useRef()

  return (
    <form className='addItem' onSubmit={handleSubmit}>
        <label htmlFor='addItem'>Add Item</label>
        <input 
            type='text' 
            ref={inputRef}
            autoFocus 
            required 
            id='addItem' 
            placeholder='Add Item'
            value={newItem}
            onChange={(e)=>{
                setNewItem(e.target.value)}}>

        </input>
        <button
        // it will set focus to input box
          onClick={()=>inputRef.current.focus()}><FaPlus /></button>
    </form>
  )
}

export default Additem