import { useState } from 'react'
import './App.css'
import SearchBar from './components/SearchBar/SearchBar'
import SearchResults from './components/SearchResults/SearchResults'
import Playlist from './components/Playlist/Playlist'

// datosParaPrueba es una variable para prueba hasta que se tenga conexion al API

const datosParaPrueba = {
    "": [],
    numeros: [
        {
            id: "00000000000000001",
            name: "Nombre1",
            artist: "Artista1",
            album: "Album1"
        }, 
        {
            id: "00000000000000002",
            name: "Nombre2",
            artist: "Artista2",
            album: "Album2"
        },
        {
            id: "00000000000000003",
            name: "Nombre3",
            artist: "Artista3",
            album: "Album3"
        },
    ],
    letras: [
        {
            id: "0000000000000000a",
            name: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean commodo nunc augue, ac faucibus orci vestibulum quis. Aliquam vel leo sit amet elit varius maximus. Curabitur laoreet lorem aliquet, blandit nulla vel, finibus justo. In hac habitasse platea dictumst. Proin luctus nibh id erat rhoncus, ac condimentum tellus congue. Mauris rutrum ultrices tortor. Curabitur pellentesque sodales cursus. FINAL",
            artist: "ArtistaA",
            album: "AlbumA"
        }, 
        {
            id: "0000000000000000b",
            name: "NombreB",
            artist: "ArtistaB",
            album: "AlbumB"
        }
    ]
}

function App() {
    const [textoResultados, setTextoResultados] = useState(""); // Termino de busqueda que cambia al presionar Buscar
    const [listaDeResultados, setListaDeResultados] = useState([])
    const [listaDeMusicas, setListaDeMusicas] = useState([]); // Lista de musicas del playlist creado

    function busquedaDeMusicas(buscar) {
        {/* Aca va el codigo para conectar a la API de Spotify */}
        setListaDeResultados(datosParaPrueba[(buscar == "numeros" || buscar == "letras" ? buscar : "")]);
        setTextoResultados(buscar);
    }

    return (
        <>
            <header>
                <h1>Jammming</h1>
            </header>
            <SearchBar busquedaDeMusicas={busquedaDeMusicas} />
            <div className='resultadosConPlaylist'>
                <SearchResults textoResultados={textoResultados} setTextoResultados={setTextoResultados} listaDeResultados={listaDeResultados} setListaDeResultados={setListaDeResultados} setListaDeMusicas={setListaDeMusicas} />
                <Playlist listaDeMusicas={listaDeMusicas} setListaDeMusicas={setListaDeMusicas} />
            </div>           
        </>
    )
}

export default App