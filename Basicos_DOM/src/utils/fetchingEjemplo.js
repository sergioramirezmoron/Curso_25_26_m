export const ejFetch = async (enlace) => {
    try {
        const response = await fetch(`http://localhost:1492/${enlace}`); //Aqui si quieres que sea un parametro, pos se lo pasas a la función
        if(!response.ok) return; // Aqui puedes poner tambien un error o lo q sea
        const data = await response.json(); // Aqui tienes ya la respuesta en json, pa que la uses, son literalmente objetos.
        return data; // La retornas pa poder usarla
    } catch (error) {
        throw new Error("Error trayendo la data");
    }
};
