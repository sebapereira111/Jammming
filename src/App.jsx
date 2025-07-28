import { useState } from 'react'
import './App.css'
import SearchBar from './components/SearchBar/SearchBar'
import SearchResults from './components/SearchResults/SearchResults'
import Playlist from './components/Playlist/Playlist'

// Resultados es una variable para prueba hasta que se tenga conexion al API

const resultados = {
    "": [],
    numeros: [
        {
            name: "Nombre1",
            artist: "Artista1",
            album: "Album1"
        }, 
        {
            name: "Nombre2",
            artist: "Artista2",
            album: "Album2"
        },
        {
            name: "Nombre3",
            artist: "Artista3",
            album: "Album3"
        },
    ],
    letras: [
        {
            name: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean commodo nunc augue, ac faucibus orci vestibulum quis. Aliquam vel leo sit amet elit varius maximus. Curabitur laoreet lorem aliquet, blandit nulla vel, finibus justo. In hac habitasse platea dictumst. Proin luctus nibh id erat rhoncus, ac condimentum tellus congue. Mauris rutrum ultrices tortor. Curabitur pellentesque sodales cursus. FINAL",
            artist: "ArtistaA",
            album: "AlbumA"
        }, 
        {
            name: "NombreB",
            artist: "ArtistaB",
            album: "AlbumB"
        }
    ]
}

function App() {
    const [buscado, setBuscado] = useState(""); // Termino de busqueda que cambia al presionar Buscar
    const [listaDeMusicas, setListaDeMusicas] = useState({}); // Lista de musicas del playlist creado

    return (
        <>
            <header>
                <h1>Jammming</h1>
            </header>
            <SearchBar setBuscado={setBuscado} />
            {/* Temporalmente filtra los resultados solo con las opciones que hay en resultados, 
            eventualmente deberia ser con la respuesta de la API */}
            {(buscado == "numeros" || buscado == "letras")?
                <div className='resultadosConPlaylist'>
                    <SearchResults buscado={buscado} setBuscado={setBuscado} resultados={resultados[buscado]} />
                    <Playlist />
                </div>
            :
                <p>Instrucciones de uso. Con los datos de prueba solo son validos "numeros" o "letras"</p>
            }
            {/* Instrucciones de uso temporales. Se deberia mejorar. :) */}
            
        </>
    )
}

export default App