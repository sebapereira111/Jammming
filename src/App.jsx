import { useState } from 'react'
import './App.css'
import SearchBar from './components/SearchBar/SearchBar'
import SearchResults from './components/SearchResults/SearchResults'


function App() {
  const [count, setCount] = useState(1)

  return (
    <>
      <header>
        <h1>Jammming</h1>
      </header>
      <div className='tarjeta'>
        <SearchBar />
      </div>
      <div className='tarjeta'>
        <SearchResults />
      </div>
    </>
  )
}

export default App
