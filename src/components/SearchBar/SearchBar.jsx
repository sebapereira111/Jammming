import { useState } from 'react'
import './SearchBar.css'

function SearchBar({ busquedaDeMusicas }) {
    const [textoSearchbar, settextoSearchbar] = useState("");

    // Al presionar Buscar llama a la funcion que realiza la busqueda
    function handleSubmit(e) {
        e.preventDefault();
        busquedaDeMusicas(textoSearchbar);
    }

    // Borrado del termino de busqueda con la X
    function handleBorrarBusqueda() {
        settextoSearchbar("");
    }

    // Modifica la variable textoSearchbar y unifica con el valor del input
    function handleChangeBusqueda(e) {
        settextoSearchbar(e.target.value)
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
            </form>
        </>
    )
}

export default SearchBar