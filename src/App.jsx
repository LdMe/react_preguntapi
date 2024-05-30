import { useState, useEffect } from 'react'
import Register from './components/Register'
import Categories from "./components/Categories"
import { getCategories } from './utils/fetch'
import './App.css'
import { LoggedInContext } from './context/loggedInContext'
import Navbar from './components/Navbar'
import Game from './components/game/Game'
function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [category, setCategory] = useState(null);

  
  if (!loggedIn) {
    return <Register onLogin={() => setLoggedIn(true)} />
  }


  return (
    <LoggedInContext.Provider value={loggedIn}>
      {/* */}
      <Navbar />
      {category ?
        <Game category={category} onReset={()=>setCategory(null)} />
        :
        <Categories onSelect={setCategory} />

      }

    </LoggedInContext.Provider>
  )
}

export default App
