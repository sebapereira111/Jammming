import { useState } from 'react'
import './SearchBar.css'

function SearchBar() {
    const [buscar, setBuscar] = useState("");
    function handleSubmit(e) {
        e.preventDefault();
        alert(`Buscando ${buscar}`);
    }
    return (
        <>
            <form className='searchBar' onSubmit={handleSubmit}>
                <input
                id="buscar"
                name="buscar"
                type="text"
                value={buscar}
                onChange={(e) => setBuscar(e.target.value)}
                />
                <button type="submit">Buscar</button>
            </form>
        </>
    )
}

export default SearchBar