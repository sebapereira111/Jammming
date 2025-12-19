import { useEffect, useState } from 'react';
import { spotifyAuthPKCE } from '../spotifyAuthPKCE'
import './User.css'

function User({ setTokens }) {
    // Para evitar que se vuelva a solicitar el token mientras se esta esperando respuesta
    const [onCallback, setOnCallback] = useState(false);
    // Guarda el usuario logueado
    const [user, setUser] = useState("");

    // Para el primer montaje, restaura datos de local storage
    useEffect(() => {
        const tokens = spotifyAuthPKCE.restoreFromStorage(setTokens, setUser);
    }, [])

    // Se comunica son Spotify para iniciar sesion
    function handleLogin() {
        spotifyAuthPKCE.authorizePKCE();
    }

    // Gestiona el callback de Spotify para continuar el inicio de sesion
    if (!onCallback) {
        spotifyAuthPKCE.handleCallback(setOnCallback, setTokens, setUser);
    }

    // Cierra sesion de usuario localmente
    function handleCerrarSesion() {
        localStorage.removeItem("spotify_auth_data");
        setTokens({
            accessToken: null,
            refreshToken: null,
            expiresAt: null,
        });
        setUser("");
    }
    
    return (
        <>
            <div className='login-container'>
                <img src="src/assets/Primary_Logo_Green_CMYK.svg" alt="Spotify logo" className='login-logo'/>
                <button id="login" onClick={handleLogin} type='button' className='login-button'>{user ? user : "Iniciar sesion"}</button>
                <button id="cerrar-sesion" onClick={handleCerrarSesion} type='button' className='cerrar-sesion-button' disabled={!user} >❌</button>
            </div>
        </>
    )
}

export default User