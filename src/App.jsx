import { useState } from 'react'
import './App.css'
import SearchBar from './components/SearchBar/SearchBar'

function App() {
  const [count, setCount] = useState(1)

  return (
    <>
      <header>
        <h1>Jammming</h1>
      </header>
      <SearchBar />
    </>
  )
}

export default App
