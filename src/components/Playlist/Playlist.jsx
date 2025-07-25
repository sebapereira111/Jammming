import { useState } from 'react'
import './Playlist.css'

function Playlist() {
    const [name, setName] = useState("");
    function handleChange(e) {
        setName(e.target.value)
        if (e.target.value == "") {
            document.getElementById('botonXPlaylist').textContent = "";
        } else {
            document.getElementById('botonXPlaylist').textContent = "❌";
        }
    }
    function handleBorrar() {
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
                            onChange={handleChange}
                        />
                        <button id='botonXPlaylist' type='button' className='botonTextoPlaylist' onClick={handleBorrar}></button>
                    </div>
                </form>
            </div>
        </>
    )
}

export default Playlist