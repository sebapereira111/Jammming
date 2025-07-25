import { useState } from 'react'
import './App.css'
import SearchBar from './components/SearchBar/SearchBar'
import SearchResults from './components/SearchResults/SearchResults'

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
            name: "NombreA",
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
    const [buscado, setBuscado] = useState("");

    return (
        <>
            <header>
                <h1>Jammming</h1>
            </header>
            <div className='tarjeta'>
                <SearchBar setBuscado={setBuscado} />
            </div>
            {(buscado == "numeros" || buscado == "letras")?
                <div className='tarjeta'>
                    <SearchResults buscado={buscado} setBuscado={setBuscado} resultados={resultados[buscado]} />
                </div>
            :
                <p>Instrucciones de uso. Con los datos de prueba solo son validos "numeros" o "letras"</p>
            }
        </>
    )
}

export default App