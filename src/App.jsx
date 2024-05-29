import { useState,useEffect } from 'react'
import Register from './components/Register'
import Categories from "./components/Categories"
import { getCategories } from './utils/fetch'
import './App.css'

function App() {
  const [loggedIn,setLoggedIn] = useState(false);

  useEffect(()=>{
    getCategories().then((response)=>{
      console.log("categories",response)
    })
  },[])
  return (
    <>
    {loggedIn ?
      <Categories />
      :
      <Register onLogin={()=>setLoggedIn(true)}/>
    }
    </>
  )
}

export default App
