import React from 'react';
import LineItem from './LineItem';

const items = ({items,handleCheck,deleteItem}) => {
  return (
    <ul>
    {items.map(item =>(
        <LineItem 
            key={item.id}
            item={item}
            handleCheck={handleCheck}
            deleteItem={deleteItem}/>
        
        ))}
    </ul>
  )
}

export default items

