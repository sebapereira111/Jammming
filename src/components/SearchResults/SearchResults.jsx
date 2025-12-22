import './SearchResults.css'
import Track from '../Track/Track'

/* Recibe 3 variables
textoResultados es el termino de busqueda realizado
setTextoResultados y setListaDeResultados son para poder borrar el temino de busqueda y los resultados
listaDeResultados es un array con los resultados
setListaDeMusicas
*/
function SearchResults({ listaDeResultados, setListaDeResultados, setListaDeMusicas }) {
    /* Funcion que borra los terminos de busqueda */
    function handleBorrar() {
        setListaDeResultados({
            query: "",
            tracks: [],
            offset : {
                previous: false,
                next: false
            }
        });
    }

    return (
        <>
            <div className='searchresults-principal'>
                <div className='searchresults-titulo'>
                    {/* Primero se ve si hay algo en textoResultados 
                    para mostrar los resultados 
                    de lo contrario muestra instrucciones */}
                    {listaDeResultados.query ? 
                    <>
                        <h2>Resultados para {listaDeResultados.query}</h2>
                        <button className='searchresults-boton-x' onClick={handleBorrar}>❌</button>
                    </>
                    : <p>Busquemos algo!</p>} {/* Las instrucciones se pueden mejorar */}
                </div>
                {listaDeResultados.tracks.map((item, index) => (<Track index={index} musica={item} boton={"+"} setListaDeMusicas={setListaDeMusicas}/>))}
            </div>
        </>
    )
}

export default SearchResults