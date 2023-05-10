import React,{useState, useEffect} from 'react'
import styled from "styled-components"

export default function Newtodo() {
    const [items, setItems] = useState([
        {
            id: 0,
            title: "Buy 1kg Tomato",
        },
        {
            id: 2,
            title: "Buy 2kg onion ",
        }
        ,{
            id: 3,
            title: "wash cloths",
        },
        {
            id: 4,
            title: "Do homework",
        }
    ])
    const [itemsdone, setItemsdone] = useState([
        {
            id: 5,
            title: "Buy 1kg Tomato",
        },
        {
            id: 6,
            title: "Buy 2kg onion ",
        }
        ,{
            id: 7,
            title: "wash cloths",
        },
        {
            id: 8,
            title: "Do homework",
        }
    ])
    const [input, setInput] = useState ("")
    const[count,setCount] = useState(0)

    useEffect (()=>{
        console.log("hello")
        
        setCount(items.length + itemsdone.length
            )},[]);
  

     let updateitems = () =>{
        return(
            items.map((item) => (
                <ListItem key = {item.id}>
                    <LeftContainer onClick={() =>additem(item.id)}>
                        <Checkcontainer ></Checkcontainer>
                        <ItemContent>{item.id}, {item.title}</ItemContent>
                    </LeftContainer>
                    <RightContainer>
                        <ActionButton onClick={()=>removeitem(item.id)}>
                            <ButtonImage src = {require("../../assets/delete.svg").default}
                             alt ="Delete"></ButtonImage>
                        </ActionButton>
                    </RightContainer>
            </ListItem>

            ))
        )
    }
    let removeitem =(id) => {
        let new_items = 
            items.filter((removed) => removed.id !== id)
        setItems(new_items);
            }
    let additem = (id) => {
        let new_items = 
        items.filter((removed) => removed.id !== id)
    setItems(new_items);
   let  newlist = items.find((added)=>added.id == id)
   setItemsdone([...itemsdone,newlist])
    }
    let revert = (id) => {
        let new_items = 
        itemsdone.filter((removed) => removed.id !== id)
    setItemsdone(new_items);
   let  newitem = itemsdone.find((added)=>added.id == id)
   setItems([...items,newitem])
    }
    let removeditem =(id) => {
        let new_items = 
            itemsdone.filter((removed) => removed.id !== id)
        setItemsdone(new_items);
            }


    let completeditems = () =>{
        return(
            itemsdone.map((itemdone) => (
                <ListItem key = {itemdone.id}>
                    <LeftContainer>
                    <Tickcontainer>
                        <Tickimg src = {require("../../assets/tick-green.svg").default} alt ="tick-green"></Tickimg>
                    </Tickcontainer>
                    <ItemContentCompleted>{itemdone.id}, {itemdone.title}</ItemContentCompleted>
                    </LeftContainer>
                    <RightContainer>
                    <ActionButton onClick={() =>revert(itemdone.id)}>
                        <ButtonImage src = {require("../../assets/revert.svg").default} alt ="revert"></ButtonImage>
                    </ActionButton>
                    <ActionButton onClick={() =>removeditem(itemdone.id)}>
                        <ButtonImage src = {require("../../assets/delete.svg").default} alt ="Delete"></ButtonImage>
                    </ActionButton>
                    </RightContainer>
            </ListItem>

            ))
        )
    }
    let listupdate = (event) => {
        event.preventDefault();
        if(input)
       { setItems([...items,{title:input, id:count + 1}])
        setInput("")}
        setCount((prev)=>prev + 1)
    }

  return (
    <Container>
        <Header>ToDo List</Header>
        <DoContainer>
          <Subheading>Things to be Done</Subheading>
          <Todolist>
            {updateitems()}
           
          </Todolist>
        </DoContainer>
        <NewToDoForm>
            <FormInput
             placeholder = "Type new Task..."
             value={input}
             onChange={(e)=>{setInput(e.target.value)}} 
             />
            <FormSubmitButton onClick={(e)=>listupdate(e)}>Add New</FormSubmitButton>
        </NewToDoForm>
        <DoContainer>
          <Subheading>Completed</Subheading>
          <Completedlist>
            {completeditems()}
          </Completedlist>
        </DoContainer>

    </Container>
  )
}

const Container = styled.div`
  width: 90% auto;
  max-width : 1000px;
  padding : 50px 10% ;
  margin : 0 auto ;
  border-left : 2px solid #f5f5f5;
  border-right : 2px solid #f5f5f5;
  min-height : 100vh ;
`;
const Header = styled.h1`
    font-size : 52px;
    font-weight : bold ;
    text-align : center;
    margin-bottom : 40px;
`
const DoContainer = styled.div``
const Subheading = styled.h3`
    font-size : 36px;
    color : #050241;
`
const Todolist = styled.ul`

`
const ListItem = styled.li`
    display : flex;
    align-items : center;
    justify-content : space-between;
    margin-bottom : 20px; 
`
const LeftContainer = styled.div`
    display : flex;
    align-items : center;

`
const Checkcontainer = styled.span`
    width : 32px;
    height : 32px;
    border-radius : 50%;
    border: 2px solid #050241;
    display : inline-block;
    margin-right : 15px;
    cursor : pointer;
    `
const ItemContent = styled.span`
    font-size :28px;
    cursor : pointer;
`
const RightContainer = styled.div``
const ActionButton = styled.button`
    border : none;
    background : none;
    cursor : pointer;
    margin-right : 20px;
    
`
const ButtonImage = styled.img``
const NewToDoForm = styled.form`
    display :flex ;
    margin-left : 40px;
    margin-top : 30px;
    position : relative;
    &::before {
        content : "";
        background-image : url(${require("../../assets/plus.svg").default});
        width:16px;
        height:16px;
        display : block;
        position : absolute;
        top : 0;
        left : 10px;
        bottom : 0;
        margin : auto 0;
        z-index : 2;


    }
`
const FormInput = styled.input`
    background : none;
    width : 100%;
    outline : none;
    border : 1px solid #c6c6c6;
    border-right : none;
    padding : 0 10px 0 35px;
    font-size : 20px;
    `
const FormSubmitButton = styled.button`
    padding : 15px 25px;
    white-space : nowrap;
    border : none;
    background : #050241;
    color : #fff;
    cursor : pointer;
    border-radius : 6px;
    border-top-left-radius : 0;
    border-bottom-left-radius : 0;
    font-size : 24px;

`
const Tickcontainer = styled(Checkcontainer)`
    display : flex;
    align-items : center;
    justify-content : center;
    border-color : #06c692;
    
`
const ItemContentCompleted = styled(ItemContent)`
    color : #06c692;
`
const Tickimg = styled.img`
    widt
`
const Completedlist =styled(Todolist)``


