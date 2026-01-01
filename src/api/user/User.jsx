import { useEffect, useState, useRef } from 'react';
import { spotifyAuthPKCE } from '../spotifyAuthPKCE';
import './User.css';
import spotifyLogoGreen from '../../assets/Primary_Logo_Green_CMYK.svg';
import spotifyLogoBlack from '../../assets/Primary_Logo_Black_CMYK.svg';

function User({ tokens, setTokens }) {
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
                // Restaura sesion con mensaje de alerta
                (async () => {
                    spotifyAuthPKCE.restoreFromStorage(setTokens).then(
                        userId => {
                            if (userId) {
                                setUser(userId);
                                alert(`Sesion iniciada con el usuario ${userId}`);
                            }
                        }
                    ).catch(
                        error => alert(error.message)
                    )
                })();
            }
        } 
    }, []);

    // Gestiona el callback de Spotify para continuar el inicio de sesion
    useEffect(() => {
        if (runCallback.current) {
            runCallback.current = false;
            // Callback con mensaje de alerta
            (async () => {
                spotifyAuthPKCE.handleCallback(setTokens).then(
                    userId => {
                        if (userId) {
                            setUser(userId);
                            alert(`Sesion iniciada con el usuario ${userId}`);
                        }
                    }
                ).catch(
                    error => alert(error.message)
                )
            })();
        }
    }, []);

    // Se comunica son Spotify para iniciar sesion
    function handleLogin() {
        localStorage.removeItem("spotify_auth_data");
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
        alert(`Sesion ${user} cerrada`);
        setUser("");
    }
    
    return (
        <>
            <div className='login-container'>
                <img onClick={handleLogin} src={tokens.refreshToken ? spotifyLogoGreen : spotifyLogoBlack} alt="Spotify logo" className='login-logo'/>
                <div className='login-desktop'>
                    <button id="login" onClick={handleLogin} type='button' className='login-button'>{user ? user : "Iniciar sesion"}</button>
                    <button id="cerrar-sesion" onClick={handleCerrarSesion} type='button' className='cerrar-sesion-button' disabled={!user} >❌</button>
                </div>
            </div>
        </>
    )
}

export default User