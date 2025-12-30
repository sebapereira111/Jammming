import { useEffect, useState, useRef } from 'react';
import { spotifyAuthPKCE } from '../spotifyAuthPKCE';
import './User.css';
import spotifyLogo from '../../assets/Primary_Logo_Green_CMYK.svg';

function User({ setTokens }) {
    // Para correr una sola vez el restoreFromStorage (por el strictmode)
    const runRestore = useRef(true);
    // Para correr solo una vez handleCallback (por el strictmode)
    const runCallback = useRef(true);
    // Guarda el usuario logueado
    const [user, setUser] = useState("");

    // Para el primer montaje, restaura datos de local storage
    useEffect(() => {
        if (import.meta.env.DEV) {
            if (runRestore.current) {
                runRestore.current = false;
                spotifyAuthPKCE.restoreFromStorage(setTokens, setUser);
            }
        } 
    }, []);

    // Gestiona el callback de Spotify para continuar el inicio de sesion
    useEffect(() => {
        if (runCallback.current) {
            runCallback.current = false;
            spotifyAuthPKCE.handleCallback(setTokens, setUser);
        }
    }, []);

    // Se comunica son Spotify para iniciar sesion
    function handleLogin() {
        spotifyAuthPKCE.authorizePKCE();
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
                <img src={spotifyLogo} alt="Spotify logo" className='login-logo'/>
                <button id="login" onClick={handleLogin} type='button' className='login-button'>{user ? user : "Iniciar sesion"}</button>
                <button id="cerrar-sesion" onClick={handleCerrarSesion} type='button' className='cerrar-sesion-button' disabled={!user} >❌</button>
            </div>
        </>
    )
}

export default User