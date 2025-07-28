import './SearchResults.css'
import Track from '../Track/Track'

/* Recibe 3 variables
buscado es el termino de busqueda realizado
setBuscado es para poder borrar el temino de busqueda y los resultados
resultados es un objeto con los resultados :) */
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