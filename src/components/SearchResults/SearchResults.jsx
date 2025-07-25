import './SearchResults.css'
import Track from '../Track/Track'

function SearchResults({ buscado, setBuscado, resultados }) {
    function handleBorrar() {
        setBuscado("");
    }
    
    return (
        <>
            <div className='resultadosBusquedaPrincipal'>
                <div className='resultadosBusquedaTitulo'>
                    <h1>Resultados para {buscado}</h1>
                    <button className='botonBorrarResultados' onClick={handleBorrar}>❌</button>
                </div>
                {resultados.map(item => (<Track name={item.name} artist={item.artist} album={item.album} />))}
            </div>
        </>
    )
}

export default SearchResults