import { useState } from 'react'
import './Playlist.css'
import Track from '../Track/Track'

function Playlist({ listaDeMusicas, setListaDeMusicas }) {
    /* Variable para el nombre de la playlist */
    const [nombrePlaylist, setNombrePlaylist] = useState("");
    /* Variable para activar y dasactivar el boton ❌ */
    const [botonXNombrePlaylistActivo, setBotonXNombrePlaylistActivo] = useState(false);

    /* Para modificar el nombre de la playlist y unificar con el texto.
    Tambien hace aparecer y desaparecer el boton ❌ */
    function handleChangeNombrePlaylist(e) {
        setNombrePlaylist(e.target.value)
        if (e.target.value == "") {
            setBotonXNombrePlaylistActivo(false);
        } else {
            setBotonXNombrePlaylistActivo(true);
        }
    }

    /* Para borrar el nombre de la playlist con la X */
    function handleBorrarNombrePlaylist() {
        setNombrePlaylist("");
        setBotonXNombrePlaylistActivo(false);
    }

    /* Borra la playlist completa */
    function handleBorrarPlaylist() {
        setListaDeMusicas([]);
    }

    /* Funcion para guardar la playlist a Spotify
    Temporalmente solo emite una alerta */
    function handleGuardarASpotify() {
        alert("Guardado a Spotify");
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
                            placeholder='Nombre de playlist'
                            onChange={handleChangeNombrePlaylist}
                        />
                        <button id='botonXNombrePlaylist' type='button' className={botonXNombrePlaylistActivo ? "playlist-boton-x-nombre-activo" : "playlist-boton-x-nombre-inactivo"} onClick={handleBorrarNombrePlaylist}>❌</button>
                    </div>
                </form>
                {listaDeMusicas.map((item, index) => (<Track index={index} musica={item} boton={"-"} setListaDeMusicas={setListaDeMusicas}/>))}
                <div className='playlist-botones-inferiores'>
                    <button disabled={!listaDeMusicas.length} onClick={handleBorrarPlaylist} >Borrar playlist</button>
                    <button disabled={!listaDeMusicas.length} onClick={handleGuardarASpotify} >Guardar a Spotify</button>
                </div>
            </div>
        </>
    )
}

export default Playlist