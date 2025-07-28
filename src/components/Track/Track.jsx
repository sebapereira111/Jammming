import './Track.css'

function Track({ index, musica, boton, setListaDeMusicas }) {
    function handleAgregarOEliminar() {
        if (boton == "+") {
            setListaDeMusicas(prev => [...prev, {
                idPlaylist: index,
                id: musica.id,
                name: musica.name,
                artist: musica.artist,
                album: musica.album
            }]);
        } else {
            setListaDeMusicas(prev => [...prev.slice(0, index), ...prev.slice(index + 1)]);
        }
    }
    /* Falta el codigo para agregar o eliminar items de la lista e interactuar con la playlist */

    return (
        <>
            <div className='seccionTrack'>
                <div className='contenidoTrack'>
                    <p className='textoTrack textoNombre'>{musica.name}</p>
                    <p className='textoTrack textoaArtista'>{musica.artist}</p>
                    <p className='textoTrack taxtoAlbum'>{musica.album}</p>
                </div>
                <button className='botonAgregarTrack' onClick={handleAgregarOEliminar}>{boton}</button>
            </div>
            <hr className='separadorTrack' />
        </>
    )
}

export default Track