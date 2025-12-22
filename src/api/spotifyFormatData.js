// Convierte los datos recibidos del archivo JSON ya parseados (como objeto)
// y retorna un objeto simplificado con solo los datos que queremos
async function extraerMusicas(datos) {
    // Primero extraemos el termino de busqueda
    const urlParams = new URLSearchParams(datos.tracks.href);
    const buscar = urlParams.get("query");

    // Despues sacamos solo los tracks
    const soloTracks = datos.tracks.items;

    // Luego mapeamos a un nuevo array solo los datos que nos interesan
    // Cada elemento del array seran un objeto con id, name, artist, album y coverArt
    const soloTracksResumido = soloTracks.map(dato => ({
        id: dato.uri,
        name: dato.name,
        artist: dato.artists[0].name,
        album: dato.album.name,
        coverArt: dato.album.images[0].url
    }));

    // Creamos un objeto con los datos que nos interesan
    // El termino de busqueda, un array de los tracks y url para nex y previous
    const resultado = {
        query: buscar,
        tracks: soloTracksResumido,
		next: datos.tracks.next ? datos.tracks.next : false,
		previous: datos.tracks.previous ? datos.tracks.previous : false,
    }

    // Devolvemos el objeto nuevo
    return resultado;
}

export const spotifyFormatData = { extraerMusicas };