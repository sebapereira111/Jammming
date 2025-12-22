import { useState } from 'react'
import './SearchBar.css'
import { spotifyGetData } from '../../api/spotifyGetData';
import { spotifyFormatData } from '../../api/spotifyFormatData';

function SearchBar({ setListaDeResultados, tokens, setTokens }) {
    const [textoSearchbar, settextoSearchbar] = useState("");
    const [offset, setOffset] = useState({
        next : false,
        previous : false
    });

    // Al presionar Buscar llama a la funcion que realiza la busqueda
    async function handleSubmit(e) {
        e.preventDefault();

        const limit = 10;
        const url = `https://api.spotify.com/v1/search?type=track&q=${encodeURIComponent(textoSearchbar)}&limit=${encodeURIComponent(String(limit))}&locale=es_LA`;
        
        try {
            await getAndSaveData(url);
        } catch(error) {
            console.error("Error en SearchBar - handleSubmit", error);
        };
    }

    // Borrado del termino de busqueda con la X
    function handleBorrarBusqueda() {
        settextoSearchbar("");
    }

    // Modifica la variable textoSearchbar y unifica con el valor del input
    function handleChangeBusqueda(e) {
        settextoSearchbar(e.target.value);
    }

    // Para el offset al llamar a la API
    async function handleOffset(e) {
        // Definimos nuestra url
        const url = offset[e.target.id];

        try {
            await getAndSaveData(url);
        } catch(error) {
            console.error("Error en SearchBar - handleOffset", error);
        }
    }

    async function getAndSaveData(url) {
        // Primero solicitamos las musicas a Spotify
        // Luego Extraemos las musicas
        // Luego Guardamos esas musicas en setListaDeResultados
        spotifyGetData.getTracks(url, tokens, setTokens).then(
            spotifyData => {
                return spotifyFormatData.extraerMusicas(spotifyData);
            }
        ).then (
            extractedMusics => {
                setListaDeResultados(extractedMusics);
                setOffset({
                    next : extractedMusics.next,
                    previous : extractedMusics.previous
                })
            }
        ).catch(
            error => {
                throw error;
            }
        );
    }

    return (
        <>
            <form className='searchbar-principal' onSubmit={handleSubmit}>
                <div className='searchbar-input'>
                    <button type='submit' className='searchbar-input-boton searchbar-input-boton-lupa' disabled={!textoSearchbar} >🔎</button>
                    <input
                        id="textoBuscar"
                        name="textoBuscar"
                        className='searchbar-input-text'
                        type="text"
                        value={textoSearchbar}
                        onChange={handleChangeBusqueda}
                    />
                    <button type='button' className='searchbar-input-boton searchbar-input-boton-x' disabled={!textoSearchbar} onClick={handleBorrarBusqueda}>❌</button>
                </div>
                <button type="submit" disabled={!textoSearchbar} >Buscar</button>
                 <div>
                    <button id="previous" onClick={handleOffset} type='button' disabled={!offset.previous} className={"searchbar-toggle searchbar-toggle-seleccionado"}>&lt;</button>
                    <button id="next" onClick={handleOffset} type='button' disabled={!offset.next} className={"searchbar-toggle searchbar-toggle-seleccionado"}>&gt;</button>
                 </div>
            </form>
        </>
    )
}

export default SearchBar