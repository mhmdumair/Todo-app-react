import Header from "./Header";
import Content from "./Content";
import Footer from "./Footer";
import { useState,useEffect } from "react";
import Additem from "./Additem";
import Searchitem from "./Searchitem";
import apiRequests from "./apiRequests";


// import './index.css'
function App() {
    
    const [items,setItems]=useState([])  
    const [newItem,setNewItem]=useState('')
    const [searchItem,setSearchItem]=useState('')
    const API_URL="http://localhost:3500/items"
    const [fetchError,setFetchError]=useState(null)
    const [isLoading,setIsLoading]=useState(true)

    useEffect(()=>{
        //const storedItems=JSON.parse(localStorage.getItem('todo-list'))
        //setItems(storedItems)
        // localStorage.setItem('todo-list',JSON.stringify(data))
        const fetchData = async () => {
            try {
                const response = await fetch(API_URL);
                if (!response.ok) {
                    throw new Error(`Data not Received`);
                }
                const listItems = await response.json();
                setItems(listItems);
                setFetchError(null)
            } catch (error) {
                setFetchError(error.message)
            }finally{
                setIsLoading(false)
            }
        };
        
        setTimeout(()=>{
            (async ()=> await fetchData())()
        },2000)
    },[])

    const handleCheck=async (id)=>{
        const newList=items.map((item)=>
            item.id===id ? {...item,checked: !item.checked}:item)
            setItems(newList)

        const myItem=newList.filter((item)=>id===item.id)[0]
        
        const reqUrl=`${API_URL}/${id}`
        const updateOptions = {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(myItem)
        };  
        await updateData(reqUrl,updateOptions)  
    }

    const deleteItem=async (id)=>{
        const newList = items.filter(item=>id!==item.id)
        setItems(newList)

        const reqUrl=`${API_URL}/${id}`
        const updateOptions = {method: 'DELETE'}  
        await updateData(reqUrl,updateOptions) 
    }
    async function handleSubmit(e) {
        e.preventDefault();
        if (!newItem) return;
        setNewItem('');
    
        const newdata = {
            id: items.length + 1,
            checked: false,
            content: newItem
        };
    
        let isAlready = false;
        for (let i of items) {
            if (i.content && i.content.toLowerCase() === newdata.content.toLowerCase()) {
                isAlready = true;
            }
        }
    
        const postOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newdata)
        };
    
        if (!isAlready) {
            let newList = [...items, newdata];
            setItems(newList);
            await updateData(API_URL, postOptions);  // Use await here
        } else {
            if (window.confirm("It's already in the list. Do you want to add this again?")) {
                let newList = [...items, newdata];
                setItems(newList);
                await updateData(API_URL, postOptions);  // Use await here
            }
        }
    }
    
    
    function thingsToDo(){
        let newList=items.filter((item)=>!item.checked)
        return newList
    }

    async function updateData(url,obj){
        const result= await apiRequests(url,obj)
        if(result){
            setFetchError(result)
        }
    }

  return (
    
    <div className="container"> 
        <Header title="To Do List"/>
        <Additem 
            newItem={newItem}
            setNewItem={setNewItem}
            handleSubmit={handleSubmit}/>
        <Searchitem 
        items={items}
        search={searchItem}
        setSearchItem={setSearchItem}/>
        <main className='content'>
            {fetchError && <p>{`Error : ${fetchError}`}</p>}
            {isLoading && <p>Loading....</p>}
            {!fetchError && !isLoading && <Content
                items={items.filter((item) => item && item.content && item.content.toLowerCase().includes(searchItem.toLowerCase()))}

                handleCheck={handleCheck}
                deleteItem={deleteItem}
            />}
        </main>
        <Footer length={items.length}
            thingsToDo={thingsToDo().length}/>
    </div>
  );
}

export default App;



// crl+alt+R    rafce
//npx json-server -p 3500 -w data/db.json
