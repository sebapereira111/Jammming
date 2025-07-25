import './Track.css'

function Track({ name, artist, album }) {
    function handleAgregar() {
        alert("Cancion Agregada!");

    }
    return (
        <>
            <div className='seccionTrack'>
                <div className='contenidoTrack'>
                    <p className='textoNombre'>{name}</p>
                    <p className='textoaArtista'>{artist}</p>
                    <p className='taxtoAlbum'>{album}</p>
                </div>
                <button className='botonAgregarTrack' onClick={handleAgregar}>+</button>
            </div>
            <hr className='separadorTrack' />
        </>
    )
}

export default Track