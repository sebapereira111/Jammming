import { useEffect, useState } from 'react';
import { spotifyAuthPKCE } from '../spotifyAuthPKCE'
import './User.css'

function User({ setTokens, isAuthenticated, setIsAuthenticated }) {
    // Para evitar que se vuelva a solicitar el token mientras se esta esperando respuesta
    const [onCallback, setOnCallback] = useState(false);
    const [user, setUser] = useState('Iniciar Sesion');

    function handleLogin() {
        spotifyAuthPKCE.authorizePKCE();
    }

    function handleCerrarSesion() {
        localStorage.removeItem("spotify_auth_data");
        setTokens({
            accessToken: null,
            refreshToken: null,
            expiresAt: null,
        });
        setIsAuthenticated(false);
        setUser('Iniciar Sesion');
    }

    useEffect(() => {
        spotifyAuthPKCE.restoreFromStorage(setTokens, setIsAuthenticated, setUser);
    }, [])

    if (!onCallback) {
        spotifyAuthPKCE.handleCallback(setOnCallback, setTokens, setIsAuthenticated, setUser);
    }

    return (
        <>
            <div className='login-container'>
                <img src="src/assets/Primary_Logo_Green_CMYK.svg" alt="Spotify logo" className='login-logo'/>
                <button id="login" onClick={handleLogin} type='button' className='login-button'>{user}</button>
                <button id="cerrar-sesion" onClick={handleCerrarSesion} type='button' className='cerrar-sesion-button' disabled={!isAuthenticated} >❌</button>
            </div>
        </>
    )
}

export default User