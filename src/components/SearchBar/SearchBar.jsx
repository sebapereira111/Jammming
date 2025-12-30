import { useState } from 'react'
import './SearchBar.css'
import { spotifyGetData } from '../../api/spotifyGetData';
import { spotifyFormatData } from '../../api/spotifyFormatData';

function SearchBar({ offset, setListaDeResultados, tokens, setTokens }) {
    // Variable que almacena el texto del searchbar
    const [textoSearchbar, settextoSearchbar] = useState("");


    // Al presionar Buscar llama a la funcion que realiza la busqueda
    async function handleSubmit(e) {
        e.preventDefault();

        // Definimos que la busqueda retorne 10 resultados
        const limit = 10;
        // Primero solicitamos las musicas a Spotify
        // Luego Extraemos las musicas
        // Luego Guardamos esas musicas en setListaDeResultados
        spotifyGetData.getTracks(textoSearchbar, limit, false, tokens, setTokens).then(
            spotifyData => spotifyFormatData.extraerMusicas(spotifyData)
        ).then (
            extractedMusics => setListaDeResultados(extractedMusics)
        ).catch(
            error => {
                console.error("Error en SearchBar - handleSubmit", error);
                alert("Error al buscar musicas de Spotify");
            }
        );
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

        // Primero solicitamos las musicas a Spotify
        // Luego Extraemos las musicas
        // Luego Guardamos esas musicas en setListaDeResultados
        spotifyGetData.getTracks(null, null, url, tokens, setTokens).then(
            spotifyData => {
                return spotifyFormatData.extraerMusicas(spotifyData);
            }
        ).then (
            extractedMusics => {
                setListaDeResultados(extractedMusics);
            }
        ).catch(
            error => {
                console.error("Error en SearchBar - handleOffset", error);
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