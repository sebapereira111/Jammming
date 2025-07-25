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
                    <h2>Resultados para {buscado}</h2>
                    <button className='botonBorrarResultados' onClick={handleBorrar}>❌</button>
                </div>
                {resultados.map(item => (<Track name={item.name} artist={item.artist} album={item.album} boton={"+"} />))}
            </div>
        </>
    )
}

export default SearchResults