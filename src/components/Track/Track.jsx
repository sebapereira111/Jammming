import './Track.css'

function Track({ index, musica, boton, setListaDeMusicas }) {
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

    return (
        <>
            <div className='seccionTrack'>
                <div className='track-contenido'>
                    <img className='track-cover-art' src={musica.coverArt} alt="" />
                    <div className='track-contenido-texto'>
                        <p className='textoTrack textoNombre'>{musica.name}</p>
                        <p className='textoTrack textoaArtista'>{musica.artist}</p>
                        <p className='textoTrack taxtoAlbum'>{musica.album}</p>
                    </div>
                </div>
                <button className='botonAgregarTrack' onClick={handleAgregarOEliminar}>{boton}</button>
            </div>
            <hr className='separadorTrack' />
        </>
    )
}

export default Track