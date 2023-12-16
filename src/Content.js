import React from 'react'
// import { useState } from 'react';
import ItemsList from "./ItemsList";

function Content({items,handleCheck,deleteItem}){

    return (
        <>
            {(items.length)? (
                <ItemsList 
                    items={items}
                    handleCheck={handleCheck}
                    deleteItem={deleteItem}/>
            ):(<p>Your List is empty</p>)
            }
        </>
    )
}

export default Content