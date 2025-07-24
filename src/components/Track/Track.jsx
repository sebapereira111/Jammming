import './Track.css'

function Track({ name, artist, album }) {
    return (
        <>
            <div className='trackDivOut'>
                <div className='trackDivIn'>
                    <div>
                        <p className='textoTrack nombre'>{name}</p>
                        <p className='textoTrack artista'>{artist}</p>
                        <p className='textoTrack album'>{album}</p>
                    </div>  
                    <button className='botonBorrarResultados'>+</button>
                </div>
                <hr />
            </div>
        </>
    )
}

export default Track