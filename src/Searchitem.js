import React from 'react'

const Searchitem = ({items,searchItem,setSearchItem}) => {
  return (
    <div>
        {items.length>1 && (
        <form className='search-box' onSubmit={(e)=>e.preventDefault()}> 
        <label htmlFor='search'></label>
        <input type='text' 
            placeholder='Search item' 
            className='search'
            value={searchItem}
            onChange={(e)=>{setSearchItem(e.target.value)}}></input>
        </form>)}
    </div>
  )
}

export default Searchitem