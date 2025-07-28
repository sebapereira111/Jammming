import { useState } from 'react'
import './SearchBar.css'

function SearchBar({ busquedaDeMusicas }) {
    const [buscar, setBuscar] = useState("");

    // Al presionar Buscar llama a la funcion que realiza la busqueda
    function handleSubmit(e) {
        e.preventDefault();
        busquedaDeMusicas(buscar);
    }
    // Borrado del termino de busqueda con la X
    function handleBorrarBusqueda() {
        setBuscar("");
        document.getElementById('botonXBusqueda').textContent = "";
    }
    // Modifica la variable buscar y unifica con el valor del input
    function handleChangeBusqueda(e) {
        setBuscar(e.target.value)
        if (e.target.value == "") {
            document.getElementById('botonXBusqueda').textContent = "";
        } else {
            document.getElementById('botonXBusqueda').textContent = "❌";
        }
    }
    
    return (
        <>
            <form className='searchBar' onSubmit={handleSubmit}>
                <div className='searchInput'>
                    <button type='submit' className='botonTextoBusqueda'>🔎</button>
                    <input
                        id="buscar"
                        name="buscar"
                        className='inputSearchBar'
                        type="text"
                        value={buscar}
                        onChange={handleChangeBusqueda}
                    />
                    <button id='botonXBusqueda' type='button' className='botonTextoBusqueda' onClick={handleBorrarBusqueda}></button>
                </div>
                <button type="submit">Buscar</button>
            </form>
        </>
    )
}

export default SearchBar