import { useState } from 'react'
import './Playlist.css'
import Track from '../Track/Track'
import { spotifyPutData } from '../../api/spotifyPutData';

function Playlist({ listaDeMusicas, setListaDeMusicas, tokens, setTokens }) {
    /* Variable para el nombre de la playlist */
    const [nombrePlaylist, setNombrePlaylist] = useState("");

    /* Para modificar el nombre de la playlist y unificar con el texto */
    function handleChangeNombrePlaylist(e) {
        setNombrePlaylist(e.target.value)
    }

    /* Para borrar el nombre de la playlist con la X */
    function handleBorrarNombrePlaylist() {
        setNombrePlaylist("");
    }

    /* Borra la playlist completa */
    function handleBorrarPlaylist() {
        setListaDeMusicas([]);
    }

    /* Funcion para guardar la playlist a Spotify */
    async function handleGuardarASpotify() {
        // Priemero creamos la playlist
        // Luego Guardamos los tracks
        spotifyPutData.createPlaylist(nombrePlaylist, tokens, setTokens).then(
            playlistId => spotifyPutData.addToPlaylist(playlistId, listaDeMusicas, tokens, setTokens)
        ).then(
            () => alert("Guardado en Spotify OK")
        ).catch(
            error => {
                console.error("Error en handleGuardarASpotify", error);
                alert("Error al guardar en Spotify");
            }   
        );
    }

    return (
        <>
            <div className='playlist-principal'>
                <form>
                    <div className='playlist-nombre'>
                        <input
                            id='textoNombrePlaylist'
                            name='textoNombrePlaylist'
                            className='playlist-nombre-texto'
                            type='text'
                            value={nombrePlaylist}
                            placeholder='Playlist name'
                            onChange={handleChangeNombrePlaylist}
                        />
                        <button type='button' className={nombrePlaylist ? "playlist-boton-x-nombre" : "playlist-boton-x-nombre playlist-boton-x-nombre-oculto"} onClick={handleBorrarNombrePlaylist}>❌</button>
                    </div>
                </form>
                {listaDeMusicas.map((item, index) => (<Track key={item.id + index} index={index} musica={item} boton={"-"} setListaDeMusicas={setListaDeMusicas}/>))}
                <div className='playlist-area-inferior'>
                    <button className='playlist-botones-inferiores' disabled={!listaDeMusicas.length} onClick={handleBorrarPlaylist} >Borrar playlist</button>
                    <button className='playlist-botones-inferiores' disabled={!listaDeMusicas.length || !nombrePlaylist || !tokens.refreshToken} onClick={handleGuardarASpotify} >Guardar a Spotify</button>
                </div>
            </div>
        </>
    )
}

export default Playlist