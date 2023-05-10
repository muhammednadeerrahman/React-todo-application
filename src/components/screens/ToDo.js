
import React,{useEffect, useState}from 'react'
import deleted from '../../assets/delete.svg'
import tickgreen from '../../assets/tick-green.svg'
import revert from '../../assets/revert.svg'
import plus from '../../assets/plus.svg'
import "./style.css"


export default function ToDo() {
    const [items,setItems] = useState([])
    const  [input, setInput] = useState("")
    const [count,setCount] = useState (0);
    

  

    let listitems = () =>{
      return(
        items.map((item) =>( 
          <li key = {item.id}>
            <div className='list'>
            <button className='span' onClick = {()=>additem(item.id)}>  </button>
            {item.id}, {" "}
            {item.name} 
            </div>
            
            <button className='deleted' onClick={() =>{removeitem(item.id)}}><img src={deleted} alt = "image1"width=""/></button>
          </li>
        ))

      )
    }

   let updateItem = () => {
     if(input) {setItems([...items,{name : input, id :count +1}])
      setInput("");
      setCount ((prev) =>prev+1)

    }}

    let removeitem = (id)=>{
      console.log(id)
      let new_list = items.filter((item)=> item.id !==id)
      setItems( new_list)
    }
    const [itemdone,setItemdone] = useState([])
    let additem = (id) =>{
      removeitem()
      let remove = items.filter((item)=> item.id !==id);
      let addlist = items.find((item)=> item.id ==id);
      setItems(remove)
      setItemdone([...itemdone,addlist]);
    }
    let revertlist =(id) =>{
      let remove = itemdone.filter((reverted)=> reverted.id !==id);
      let reveritem =itemdone.find((reverted) => reverted.id ==id)
      setItems([...items,reveritem])
      setItemdone(remove)
      
    }
    let listdelete = (id) =>{
      let listdeleted = itemdone.filter((deleted)=> deleted.id !==id);
      setItemdone(listdeleted )

    }
    useEffect(() =>{
      setCount(items.length + itemdone.length)
    },[])

    

  return (
    <div className='main'>
        <h1>
        Todo List
        </h1>
        <div className='todo'>
        <ul>
          <h2>Things to be done</h2>
          <div className='item'>
            { listitems()}

          </div>
          
          <div className='form'>
            <img src={plus} alt ="plusimage"/>
            <input placeholder=' Type new task...' value = {input} onChange={(e) =>{setInput(e.target.value)}}/>
            <button onClick={updateItem} className='add-item'>Add item</button> 
            
          </div>
          
           
          
        </ul>
        </div>
        
        <div className='complete'>
          <ul >
            <h2>Completed</h2>
          { itemdone.map((list) =>(
              <li  key = {list.id}>
                <div className='list'>
                    <span><img src = {tickgreen} alt=""/></span> 
                    {list.id}, 
                    {list.name}

                </div>
                
                <div className='buttons' >
                    <button onClick={()=>revertlist(list.id)}><img src = {revert} alt=""/></button>
                    <button onClick={()=>{listdelete(list.id)}}><img src={deleted} alt = "image1"width=""/></button>
                </div>
              
              </li>
            ) 
            )}
            
          </ul>
        </div>
       
    </div>
  )
}
