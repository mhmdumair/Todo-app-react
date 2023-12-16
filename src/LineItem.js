import React from 'react';
import { FaRegTrashAlt } from "react-icons/fa";


const LineItem = ({item,handleCheck,deleteItem}) => {
  return (
    <li className='item'>
        <input type='checkbox'checked={item.checked}
                onChange={()=>handleCheck(item.id)} />
        <label onDoubleClick={()=>handleCheck(item.id)}
                style={item.checked? {textDecoration :'line-through'}: null}>
            {item.content}</label>
        <FaRegTrashAlt 
            role='button' 
            tabIndex='0'
            className='delete'
            aria-label={`Delete ${item.content }`}
            onClick={()=> deleteItem(item.id)}/>
    </li>
  )
}

export default LineItem