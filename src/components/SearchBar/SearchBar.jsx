import { useState } from 'react'
import './SearchBar.css'

function SearchBar({ setBuscado }) {
    const [buscar, setBuscar] = useState("");
    function handleSubmit(e) {
        e.preventDefault();
        setBuscado(buscar);
    }
    function handleBorrarBusqueda() {
        setBuscar("");
        document.getElementById('botonXBusqueda').textContent = "";
    }
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