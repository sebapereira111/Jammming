import { useState } from 'react'
import './Track.css'

function Track({ index, musica, boton, setListaDeMusicas }) {
    const [mostrarCoverArt, useMostrarCoverArt] = useState(false);

    function handleAgregarOEliminar() {
        if (boton == "+") {
            setListaDeMusicas(prev => [...prev, {
                id: musica.id,
                name: musica.name,
                artist: musica.artist,
                album: musica.album,
                coverArt: musica.coverArt
            }]);
        } else {
            setListaDeMusicas(prev => [...prev.slice(0, index), ...prev.slice(index + 1)]);
        }
    }

    function handleMostrarCoverArt() {
        useMostrarCoverArt(true);
    }

    function handleOcultarCoverArt() {
        useMostrarCoverArt(false);
    }

    return (
        <>
            <dialog className='track-dialog' open={mostrarCoverArt}>
                <img className='track-cover-art-grande' src={musica.coverArt} alt="" />
                <div className='track-dialog-text'>
                    <p className='track-texto-nombre'>{musica.name}</p>
                    <p className='track-texto-artista'>{musica.artist}</p>
                    <p className='track-texto-album'>{musica.album}</p>
                </div>
            </dialog>
            <div className='track-seccion'>
                <div className='track-contenido'>
                    <img onMouseEnter={handleMostrarCoverArt} onMouseLeave={handleOcultarCoverArt} className='track-cover-art' src={musica.coverArt} alt="" />
                    <div className='track-contenido-texto'>
                        <p className='track-texto-nombre'>{musica.name}</p>
                        <p className='track-texto-artista'>{musica.artist}</p>
                        <p className='track-texto-album'>{musica.album}</p>
                    </div>
                </div>
                <button className='track-boton' onClick={handleAgregarOEliminar}>{boton}</button>
            </div>
            <hr className='track-separador' />
        </>
    )
}

export default Track