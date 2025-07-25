import './Track.css'

function Track({ name, artist, album }) {
    function handleAgregar() {
        alert("Cancion Agregada!");

    }
    return (
        <>
            <div className='seccionTrack'>
                <div className='contenidoTrack'>
                    <p className='textoTrack textoNombre'>{name}</p>
                    <p className='textoTrack textoaArtista'>{artist}</p>
                    <p className='textoTrack taxtoAlbum'>{album}</p>
                </div>
                <button className='botonAgregarTrack' onClick={handleAgregar}>+</button>
            </div>
            <hr className='separadorTrack' />
        </>
    )
}

export default Track