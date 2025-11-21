import { canciones } from "../db/data";
// VARIABLES
const CATALOGO = "catalogo";
const PLAYLISTS = "playlists";

// FUNCIONES AUXILIARES
const cargarMapLS = (clave) => {
  if (typeof clave !== "string") {
    throw new Error("No le has pasado un string");
  }
  const datos = localStorage.getItem(clave);
  if (!datos) {
    return new Map();
  }
  return new Map(JSON.parse(datos));
};

const guardarMapLS = (clave, myMap) => {
  if (typeof clave !== "string") {
    throw new Error("No le has pasado un string");
  }

  // Convertir el Map en un array serializable (convirtiendo los Sets internos a arrays)
  const arrayDesdeMap = Array.from(myMap, ([k, v]) => {
    if (v instanceof Set) {
      return [k, Array.from(v)];
    }
    return [k, v];
  });
  localStorage.setItem(clave, JSON.stringify(arrayDesdeMap));
};

const cargarSetLS = (clave) => {
  if (typeof clave !== "string") {
    throw new Error("No le has pasado un string");
  }
  const datos = localStorage.getItem(clave);
  if (!datos) {
    return new Set();
  }
  return new Set(JSON.parse(datos));
};

const guardarSetLS = (clave, mySet) => {
  const arrayDesdeSet = Array.from(mySet);
  localStorage.setItem(clave, JSON.stringify(arrayDesdeSet));
};

// EJERCICIOS

export const crearCatalogo = () => {
  const catalogo = new Map();
  canciones.forEach((c) => {
    catalogo.set(c.id, {
      ...c,
      historialReproduccion: [],
    });
  });

  guardarMapLS(CATALOGO, catalogo);
  return catalogo;
};

export const reproducirCancion = (idCancion) => {
  const catalogo = cargarMapLS(CATALOGO);
  if (!catalogo.has(idCancion)) {
    throw new Error(`La cancion con ${idCancion} no existe`);
  }

  const cancionReproducida = catalogo.get(idCancion);
  cancionReproducida.reproducirCancion++;
  cancionReproducida.historialReproduccion.push({
    fecha: new Date().toISOString(),
    timestamp: Date.now(),
  });
  catalogo.set(idCancion, cancionReproducida);
  console.log(`Reproduciendo: ${cancionReproducida.titulo}`);
  return cancionReproducida;
};

export const gestionarPlaylists = () => {
  const playlists = cargarMapLS(PLAYLISTS); // devuelve un Map directamente
  const playListConSets = new Map();

  for (const [nombre, ids] of playlists.entries()) {
    playListConSets.set(nombre, new Set(ids));
  }

  guardarMapLS(PLAYLISTS, playListConSets);

  // Crear playlist
  const crear = (nombrePlaylist) => {
    if (playListConSets.has(nombrePlaylist)) {
      console.log("La playList ya está creada");
      return false;
    }

    playListConSets.set(nombrePlaylist, new Set());
    guardarMapLS(PLAYLISTS, playListConSets);
    return true;
  };

  // Agregar a la playlist
  const agregar = (nombrePlaylist, idCancion) => {
    const catalogo = cargarMapLS(CATALOGO);
    if (!catalogo.has(idCancion)) {
      throw new Error("No se encuentra la canción");
    }

    // Crear la playlist si no existe
    if (!playListConSets.has(nombrePlaylist)) {
      playListConSets.set(nombrePlaylist, new Set());
    }

    const setIds = playListConSets.get(nombrePlaylist);
    if (setIds.has(idCancion)) {
      console.log("La canción introducida ya se encuentra en la playlist");
      return false;
    }

    setIds.add(idCancion);
    playListConSets.set(nombrePlaylist, setIds);
    guardarMapLS("playlists", playListConSets);
    return true;
  };

  // Eliminar de la playlist
  const eliminar = (nombrePlaylist, idCancion) => {
    const catalogo = cargarMapLS(CATALOGO);

    if (!catalogo.has(idCancion)) {
      console.log("La canción no existe en el catálogo");
      return false;
    }

    if (!playListConSets.has(nombrePlaylist)) {
      console.log("No existe la playlist");
      return false;
    }

    const cancionesSet = playListConSets.get(nombrePlaylist);

    if (!cancionesSet.has(idCancion)) {
      console.log("La canción no está en la playlist");
      return false;
    }

    cancionesSet.delete(idCancion);
    playListConSets.set(nombrePlaylist, cancionesSet);
    guardarMapLS(PLAYLISTS, playListConSets);
    return true;
  };

  // Obtener PlayList
  const obtener = (nombrePlaylist) => {
    const catalogo = cargarMapLS(CATALOGO);

    if (!playListConSets.has(nombrePlaylist)) {
      throw new Error("No existe esa playlist");
    }

    const ids = playListConSets.get(nombrePlaylist); // Set
    const idsArray = Array.from(ids);

    const cancionesPlaylist = idsArray.map((id) => catalogo.get(id));

    return cancionesPlaylist;
  };

  // Listar PlayLists
  const listar = () => {
    return Array.from(playListConSets.keys());
  };

  return { crear, agregar, eliminar, obtener, listar };
};

// Catalogo:
// Crear una funcion que le pases como parametro artista y te devuelva en nombre de todas las canciones que tiene dicho artista.
// Crear una funcion que le pases como parámetro max o min y obtenga ordenadas por el nombre de la canción, las 5 canciones más o menos reproducidas.
// Crear una función reset que ponga todos los contadores de las canciones a 0.
// Crear una función totalReproducciones que obtenga el total de reproducciones de mi catálogo musical.

export const cancionesArtista = (artista) => {
  if (typeof artista !== "string") {
    throw new Error("Se requiere un String de artista");
  }

  return canciones
    .filter((cancion) => cancion.artista === artista)
    .map((cancion) => cancion.titulo);
};

export const reproduccionesMaxMin = (modo = "max") => {
  if (modo !== "max" && modo !== "min") {
    throw new Error("Modo incorrecto");
  }

  const songsRep = [...canciones].sort((a, b) => {
    if (modo === "max") {
      return b.reproducciones - a.reproducciones;
    } else {
      return a.reproducciones - b.reproducciones;
    }
  });
  const top5 = songsRep.slice(0, 5);
  const ordenadoNombre = top5.sort((a, b) => a.titulo.localeCompare(b.titulo));
  return ordenadoNombre;
};

export const reset = () => {
  canciones.forEach((cancion) => (cancion.reproducciones = 0));
};

export const totalReproducciones = () => {
  return canciones.reduce((acc, cancion) => acc + cancion.reproducciones, 0);
};

// Parte 3
export const construirIndiceBusqueda = () => {
  const catalogo = cargarMapLS(CATALOGO);
  const indice = new Map();

  const limpiarTexto = (texto) => {
    return texto
      .toString()
      .toLowerCase()
      .replace(/[^\w\s]/g, "")
      .trim();
  };

  for (const [id, cancion] of catalogo.entries()) {
    const campos = [
      cancion.titulo,
      cancion.artista,
      cancion.album,
      cancion.genero,
      cancion.año?.toString() || "",
    ];

    for (const campo of campos) {
      const limpio = limpiarTexto(campo);
      if (!indice.has(limpio)) {
        indice.set(limpio, new Set([id]));
      } else {
        indice.get(limpio).add(id);
      }
    }
  }

  const arrayDesdeMap = Array.from(indice, ([k, v]) => [k, Array.from(v)]);
  localStorage.setItem("indiceBusqueda", JSON.stringify(arrayDesdeMap));

  return indice;
};

// FUNCION 5
export const buscarCanciones = (termino, filtros = {}) => {
  const indice = cargarMapLS("indiceBusqueda");
  const catalogo = cargarMapLS("catalogo");

  if (!termino) throw new Error("Debe ingresar un término de búsqueda");

  const terminoMinusculas = termino.toLowerCase();

  if (!indice.has(terminoMinusculas)) {
    throw new Error("No existe el término buscado");
  }

  const setIds = new Set(indice.get(terminoMinusculas));
  const catalogoArray = [...catalogo.values()];
  let canciones = catalogoArray.filter((cancion) => setIds.has(cancion.id));

  // Aplicar filtros en cadena
  if (filtros.genero) {
    canciones = canciones.filter((c) => c.genero === filtros.genero);
  }

  if (filtros.añoMin) {
    canciones = canciones.filter((c) => c.año >= filtros.añoMin);
  }

  if (filtros.añoMax) {
    canciones = canciones.filter((c) => c.año <= filtros.añoMax);
  }

  if (filtros.duracionMax) {
    canciones = canciones.filter((c) => c.duracion <= filtros.duracionMax);
  }

  // Ordenar por número de reproducciones descendente
  const cancionesOrdenadas = canciones.sort(
    (a, b) => b.reproducciones - a.reproducciones
  );

  return cancionesOrdenadas;
};

// FUNCION
export const generarEstadisticasMusicales = () => {
  const catalogo = cargarMapLS(CATALOGO);
  const catalogoArray = [...catalogo.values()];

  // total canciones
  const totalCanciones = () => catalogo.size;

  // total duracion
  const duracionTotal = () => {
    return (
      catalogoArray.reduce((acc, cancion) => acc + cancion.duracion, 0) / 60
    ).toFixed(2);
  };

  // cancion mas reproducida
  const cancionMasReproducida = () => {
    const maxRep = catalogoArray.reduce((max, cancion) => {
      return max > cancion.reproducciones ? max : cancion.reproducciones;
    }, catalogoArray[1].reproducciones);

    return catalogoArray.find((cancion) => cancion.reproducciones === maxRep);
  };

  // Generos por cantidad
  const generosPorCantidad = () => {
    return catalogoArray.reduce((acc, cancion) => {
      if (!acc[cancion.genero]) {
        acc[cancion.genero] = 0;
      }
      acc[cancion.genero]++;
      return acc;
    }, {});
  };

  // Artistas unicos
  const artistasUnicos = () => {
    const setArtistas = new Set();
    catalogoArray.forEach((cancion) => setArtistas.add(cancion.artista));
    return setArtistas.size;
  };

  // Año promedio
  const añoPromedio = () => {
    const sumaAños = catalogoArray.reduce(
      (acc, cancion) => acc + cancion.año,
      0
    );
    return Math.round(sumaAños / catalogoArray.length);
  };

  // Distribucion decadas
  const distribucionDecadas = () => {
    const distribucion = catalogoArray.reduce((acc, cancion) => {
      if (!acc[Math.floor(cancion.año / 10) * 10 + "s"]) {
        acc[Math.floor(cancion.año / 10) * 10 + "s"] = 0;
      }
      acc[Math.floor(cancion.año / 10) * 10 + "s"]++;
      return acc;
    }, {});
    return distribucion;
  };

  return {
    totalCanciones,
    duracionTotal,
    cancionMasReproducida,
    generosPorCantidad,
    artistasUnicos,
    añoPromedio,
    distribucionDecadas,
  };
};
