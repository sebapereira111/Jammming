import { useState } from 'react'
import './Playlist.css'

function Playlist() {
    /* Variable para el nombre de la playlist */
    const [name, setName] = useState("");
    /* Para modificar el nomre la playlist y unificar con el texto */
    function handleChangePlaylist(e) {
        setName(e.target.value)
        if (e.target.value == "") {
            document.getElementById('botonXPlaylist').textContent = "";
        } else {
            document.getElementById('botonXPlaylist').textContent = "❌";
        }
    }
    /* Para borrar el nombre de la playlist */
    function handleBorrarNombrePlaylist() {
        setName("");
        document.getElementById('botonXPlaylist').textContent = "";
    }

    return (
        <>
            <div className='playlistPrincipal'>
                <form>
                    <div className='playlistNameInput'>
                        <input
                            id="playlistName"
                            name="playlistName"
                            className='inputPlaylist'
                            type="text"
                            value={name}
                            placeholder='Nombre de playlist'
                            onChange={handleChangePlaylist}
                        />
                        <button id='botonXPlaylist' type='button' className='botonTextoPlaylist' onClick={handleBorrarNombrePlaylist}></button>
                    </div>
                </form>
                {/* Falta agregar el codigo para mostrar las musicas de la playlist */}
            </div>
        </>
    )
}

export default Playlist