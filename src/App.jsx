import { useState } from 'react'
import './App.css'
import SearchBar from './components/SearchBar/SearchBar'
import SearchResults from './components/SearchResults/SearchResults'
import Playlist from './components/Playlist/Playlist'
import User from './api/user/user'

function App() {
    // Variables globales
    // Lista de musicas devueltas por la API
    const [listaDeResultados, setListaDeResultados] = useState({
        query: "",
        tracks: [],
        offset : {
            previous: false,
            next: false
        }
    });
     // Lista de musicas del nuevo playlist creado
    const [listaDeMusicas, setListaDeMusicas] = useState([]);
    // Datos para realizar solicitud a la API de Spotify
    const [tokens, setTokens] = useState({
        accessToken: null,
        refreshToken: null,
        expiresAt: null,
    });

    return (
        <>
            <User setTokens={setTokens} />
            <header>
                <h1>Jammming</h1>
            </header>
            <SearchBar setListaDeResultados={setListaDeResultados} tokens={tokens} setTokens= {setTokens} />
            <div className='app-resultados-y-playlist'>
                <SearchResults listaDeResultados={listaDeResultados} setListaDeResultados={setListaDeResultados} setListaDeMusicas={setListaDeMusicas} tokens={tokens} setTokens={setTokens} />
                <Playlist listaDeMusicas={listaDeMusicas} setListaDeMusicas={setListaDeMusicas} tokens={tokens} setTokens={setTokens} />
            </div>
        </>
    )
}

export default App