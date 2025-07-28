import './Track.css'

function Track({ name, artist, album, boton }) {
    function handleAgregarOEliminar() {
        if (boton == "+") {
            alert("Cancion agregada!");
        } else {
            alert("Cancion eliminada!");
        }
    }
    /* Falta el codigo para agregar o eliminar items de la lista e interactuar con la playlist */

    return (
        <>
            <div className='seccionTrack'>
                <div className='contenidoTrack'>
                    <p className='textoTrack textoNombre'>{name}</p>
                    <p className='textoTrack textoaArtista'>{artist}</p>
                    <p className='textoTrack taxtoAlbum'>{album}</p>
                </div>
                <button className='botonAgregarTrack' onClick={handleAgregarOEliminar}>{boton}</button>
            </div>
            <hr className='separadorTrack' />
        </>
    )
}

export default Track