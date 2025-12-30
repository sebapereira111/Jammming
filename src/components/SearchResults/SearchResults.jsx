import './SearchResults.css'
import Track from '../Track/Track'
import { spotifyGetData } from '../../api/spotifyGetData';
import { spotifyFormatData } from '../../api/spotifyFormatData';

/* Recibe 3 variables
textoResultados es el termino de busqueda realizado
setTextoResultados y setListaDeResultados son para poder borrar el temino de busqueda y los resultados
listaDeResultados es un array con los resultados
setListaDeMusicas
*/
function SearchResults({ listaDeResultados, setListaDeResultados, setListaDeMusicas, tokens, setTokens }) {
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

    // Para el offset al llamar a la API
    async function handleOffset(e) {
        // Definimos nuestra url
        const url = listaDeResultados.offset[e.target.id];

        // Primero solicitamos las musicas a Spotify
        // Luego Extraemos las musicas
        // Luego Guardamos esas musicas en setListaDeResultados
        spotifyGetData.moreTracks(url, tokens, setTokens).then(
            spotifyData => {
                return spotifyFormatData.extraerMusicas(spotifyData);
            }
        ).then (
            extractedMusics => {
                setListaDeResultados(extractedMusics);
            }
        ).catch(
            error => {
                console.error("Error en RearchResults - handleOffset", error);
            }
        );
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
                <div className='searchresults-lista'>
                    {listaDeResultados.tracks.map((item, index) => (<Track key={item.id + index} index={index} musica={item} boton={"+"} setListaDeMusicas={setListaDeMusicas}/>))}
                </div>
                <div className='searchresults-nav'>
                    <button id="previous" onClick={handleOffset} type='button' className={listaDeResultados.offset.previous ? "searchresults-nav-button" : "searchresults-nav-button searchresults-nav-button-oculto"}>&lt;</button>
                    <button id="next" onClick={handleOffset} type='button' className={listaDeResultados.offset.next ? "searchresults-nav-button" : "searchresults-nav-button searchresults-nav-button-oculto"}>&gt;</button>
                </div>
            </div>
        </>
    )
}

export default SearchResults