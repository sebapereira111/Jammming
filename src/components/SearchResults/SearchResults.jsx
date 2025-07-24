import './SearchResults.css'
import Track from '../Track/Track'

function SearchResults({ buscado, resultados }) {

    return (
        <>
            <div className='searchResults'>
                <div className='tituloResultados'>
                    <h1>Resultados para {buscado}</h1>
                    <button className='botonBorrarResultados'>❌</button>
                </div>
                {buscado && resultados.map(item => (<Track name={item.name} artist={item.artist} album={item.album} />))}
            </div>
        </>
    )
}

export default SearchResults