import { useState, useEffect } from 'react'
import Register from './components/register/Register'
import Categories from "./components/categories/Categories"
import './App.css'
import { LoggedInContext } from './context/loggedInContext'
import Navbar from './components/navbar/Navbar'
import Game from './components/game/Game'
function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [category, setCategory] = useState(null);

  
  function logOut() {
    setLoggedIn(false);
    setCategory(null);
  }
  function goHome() {
    setCategory(null);
  }
  let content =  <Register onLogin={() => setLoggedIn(true)} />;
  if (loggedIn) {
    content = (
      <>
        {category ?
          <Game category={category} onReset={goHome}/>
          :
          <Categories onSelect={setCategory} />
        }
      </>
    )
  }
  return (
    <LoggedInContext.Provider value={{loggedIn, logOut}}>
      {/* */}
      <Navbar goHome={goHome} />

      {content}

    </LoggedInContext.Provider>
  )
}

export default App
