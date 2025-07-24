import { useState } from 'react'
import './SearchBar.css'

function SearchBar({ setBuscado }) {
    const [buscar, setBuscar] = useState("");
    function handleSubmit(e) {
        e.preventDefault();
        setBuscado(buscar);
    }
    function handleBorrar() {
        setBuscar("");
        document.getElementById('botonX').textContent = "";
    }
    function handleChange(e) {
        setBuscar(e.target.value)
        if (e.target.value == "") {
            document.getElementById('botonX').textContent = "";
        } else {
            document.getElementById('botonX').textContent = "❌";
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
                        type="text"
                        value={buscar}
                        onChange={handleChange}
                    />
                    <button id='botonX' type='button' className='botonTextoBusqueda' onClick={handleBorrar}></button>
                </div>
                <button type="submit">Buscar</button>
            </form>
        </>
    )
}

export default SearchBar