import './SearchResults.css'
import Track from '../Track/Track'

/* Recibe 3 variables
buscado es el termino de busqueda realizado
setBuscado es para poder borrar el temino de busqueda y los resultados
resultados es un objeto con los resultados :) */
function SearchResults({ palabraBuscada, setPalabraBuscada, listaDeResultados, setListaDeResultados, setListaDeMusicas }) {
    function handleBorrar() {
        setPalabraBuscada("");
        setListaDeResultados([]);
    }

    return (
        <>
            <div className='resultadosBusquedaPrincipal'>
                <div className='resultadosBusquedaTitulo'>
                    {palabraBuscada ? 
                    <>
                        <h2>Resultados para {palabraBuscada}</h2>
                        <button className='botonBorrarResultados' onClick={handleBorrar}>❌</button>
                    </>
                    : <p>Busquemos algo!</p>}
                </div>
                {listaDeResultados.map((item, index) => (<Track index={index} musica={item} boton={"+"} setListaDeMusicas={setListaDeMusicas}/>))}
            </div>
        </>
    )
}

export default SearchResults