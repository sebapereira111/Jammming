import { useState } from 'react'
import './App.css'
import SearchBar from './components/SearchBar/SearchBar'
import SearchResults from './components/SearchResults/SearchResults'
import Playlist from './components/Playlist/Playlist'
import busquedaDeMusicas from './api/busquedaDeMusicas'

function App() {
    const [listaDeResultados, setListaDeResultados] = useState({
      query: "",
      tracks: []
    }) // Lista de musicas devueltas por la API
    const [listaDeMusicas, setListaDeMusicas] = useState([]); // Lista de musicas del playlist creado

    return (
        <>
            <header>
                <h1>Jammming</h1>
            </header>
            <SearchBar busquedaDeMusicas={busquedaDeMusicas} setListaDeResultados={setListaDeResultados} />
            <div className='app-resultados-y-playlist'>
                <SearchResults listaDeResultados={listaDeResultados} setListaDeResultados={setListaDeResultados} setListaDeMusicas={setListaDeMusicas} />
                <Playlist listaDeMusicas={listaDeMusicas} setListaDeMusicas={setListaDeMusicas} />
            </div>
        </>
    )
}

export default App