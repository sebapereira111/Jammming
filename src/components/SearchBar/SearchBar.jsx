import { useState } from 'react'
import './SearchBar.css'

function SearchBar({ busquedaDeMusicas, setListaDeResultados, tokens }) {
    const [textoSearchbar, settextoSearchbar] = useState("");

    // Al presionar Buscar llama a la funcion que realiza la busqueda
    function handleSubmit(e) {
        e.preventDefault();
        // Llama la funcion que usa la API para obtener los resultados y recibe los datos ya formateados
        //const resultadoMusicas = busquedaDeMusicas(textoSearchbar, tokens);
        // Guarda esos resultados en la ListaDeResultados
        //setListaDeResultados(resultadoMusicas);
        busquedaDeMusicas(textoSearchbar, tokens).then(
            resultadoMusicas => {
                setListaDeResultados(resultadoMusicas);
            }
        ).catch(
            error => {
                alert(`Error ${error.status}`);
            }
        )
    }

    // Borrado del termino de busqueda con la X
    function handleBorrarBusqueda() {
        settextoSearchbar("");
    }

    // Modifica la variable textoSearchbar y unifica con el valor del input
    function handleChangeBusqueda(e) {
        settextoSearchbar(e.target.value);
    }

    // Para el offset al llamar a la API
    function handleOffset(e) {

    }
    
    return (
        <>
            <form className='searchbar-principal' onSubmit={handleSubmit}>
                <div className='searchbar-input'>
                    <button type='submit' className='searchbar-input-boton searchbar-input-boton-lupa' disabled={!textoSearchbar} >🔎</button>
                    <input
                        id="textoBuscar"
                        name="textoBuscar"
                        className='searchbar-input-text'
                        type="text"
                        value={textoSearchbar}
                        onChange={handleChangeBusqueda}
                    />
                    <button type='button' className='searchbar-input-boton searchbar-input-boton-x' disabled={!textoSearchbar} onClick={handleBorrarBusqueda}>❌</button>
                </div>
                <button type="submit" disabled={!textoSearchbar} >Buscar</button>
                 <div>
                    <button id="previous" onClick={handleOffset} type='button' className={"searchbar-toggle searchbar-toggle-seleccionado"}>&lt;</button>
                    <button id="next" onClick={handleOffset} type='button' className={"searchbar-toggle searchbar-toggle-seleccionado"}>&gt;</button>
                 </div>
            </form>
        </>
    )
}

export default SearchBar