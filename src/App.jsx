import { useState } from 'react'
import './App.css'
import SearchBar from './components/SearchBar/SearchBar'
import SearchResults from './components/SearchResults/SearchResults'
import Playlist from './components/Playlist/Playlist'
import busquedaDeMusicas from './api/busquedaDeMusicas'
import User from './api/user/user'

function App() {
    const [listaDeResultados, setListaDeResultados] = useState({
        query: "",
        tracks: []
    }); // Lista de musicas devueltas por la API
    const [listaDeMusicas, setListaDeMusicas] = useState([]); // Lista de musicas del playlist creado
    const [tokens, setTokens] = useState({
        accessToken: null,
        refreshToken: null,
        expiresAt: null,
    });
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    return (
        <>
            <User tokens={tokens} setTokens={setTokens} isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated} />
            <header>
                <h1>Jammming</h1>
            </header>
            <SearchBar busquedaDeMusicas={busquedaDeMusicas} setListaDeResultados={setListaDeResultados} tokens={tokens} />
            <div className='app-resultados-y-playlist'>
                <SearchResults listaDeResultados={listaDeResultados} setListaDeResultados={setListaDeResultados} setListaDeMusicas={setListaDeMusicas} />
                <Playlist listaDeMusicas={listaDeMusicas} setListaDeMusicas={setListaDeMusicas} />
            </div>
        </>
    )
}

export default App