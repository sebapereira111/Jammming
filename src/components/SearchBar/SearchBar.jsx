import { useState } from 'react'
import './SearchBar.css'

function SearchBar({ busquedaDeMusicas, setListaDeResultados }) {
    const [textoSearchbar, settextoSearchbar] = useState("");
    // para elegir el type de busqueda, puede ser tracks, artists, albums o multi
    const [typeBusquedaSearchbar, setTypeBusquedaSearchbar] = useState("tracks");

    // Al presionar Buscar llama a la funcion que realiza la busqueda
    function handleSubmit(e) {
        e.preventDefault();
        // Llama la funcion que usa la API para obtener los resultados y recibe los datos ya formateados
        const resultadoMusicas = busquedaDeMusicas(textoSearchbar, typeBusquedaSearchbar);
        // Guarda esos resultados en la ListaDeResultados
        setListaDeResultados(resultadoMusicas);
    }

    // Borrado del termino de busqueda con la X
    function handleBorrarBusqueda() {
        settextoSearchbar("");
    }

    // Modifica la variable textoSearchbar y unifica con el valor del input
    function handleChangeBusqueda(e) {
        settextoSearchbar(e.target.value)
    }

    // Modifica los botones para elegir que buscar
    // Type se llama en la API
    function handleTypeToggle(e) {
        setTypeBusquedaSearchbar(e.target.id);
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
                    <button id="tracks" onClick={handleTypeToggle} type='button' className={["tracks", "multi"].includes(typeBusquedaSearchbar) ? "searchbar-toggle searchbar-toggle-seleccionado" : "searchbar-toggle"}>♫</button>
                    <button id="artists" onClick={handleTypeToggle} type='button' className={["artists", "multi"].includes(typeBusquedaSearchbar) ? "searchbar-toggle searchbar-toggle-seleccionado" : "searchbar-toggle"}>🎙️</button>
                    <button id="albums" onClick={handleTypeToggle} type='button' className={["albums", "multi"].includes(typeBusquedaSearchbar) ? "searchbar-toggle searchbar-toggle-seleccionado" : "searchbar-toggle"}>💿</button>
                    <button id="multi" onClick={handleTypeToggle} type='button' className={["multi"].includes(typeBusquedaSearchbar) ? "searchbar-toggle searchbar-toggle-seleccionado searchbar-toggle-todo" : "searchbar-toggle searchbar-toggle-todo"}>Todo</button>
                 </div>
            </form>
        </>
    )
}

export default SearchBar