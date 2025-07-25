import './Track.css'

function Track({ name, artist, album, boton }) {
    function handleAgregar() {
        if (boton == "+") {
            alert("Cancion agregada!");
        } else {
            alert("Cancion eliminada!");
        }
    }
    
    return (
        <>
            <div className='seccionTrack'>
                <div className='contenidoTrack'>
                    <p className='textoTrack textoNombre'>{name}</p>
                    <p className='textoTrack textoaArtista'>{artist}</p>
                    <p className='textoTrack taxtoAlbum'>{album}</p>
                </div>
                <button className='botonAgregarTrack' onClick={handleAgregar}>{boton}</button>
            </div>
            <hr className='separadorTrack' />
        </>
    )
}

export default Track