import { imagesData } from "../data/images";

export function createImageCard(image, onImageClick, onFavoriteToggle) {
  // Contenedor principal
  const card = document.createElement("div");
  card.className =
    "bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 hover:scale-105 cursor-pointer group relative";

  card.dataset.imageId = image.id;

  // Imagen
  const img = document.createElement("img");
  img.src = image.url;
  img.alt = image.title;
  img.className =
    "w-full h-64 object-cover group-hover:opacity-90 transition-opacity";
  img.onerror = () => {
    return (img.src =
      "Aqui iria la url de una imagen que simbolice no disponible");
  };

  card.appendChild(img);

  // Gestionar el corazón del favorito

  // Información de la imagen
  const infoContainer = document.createElement("div");
  infoContainer.className = "p-4 bg-white";

  const title = document.createElement("h2");
  title.className = "font-bold text-lg text-gray-800 mb-2 ";
  title.textContent = image.title;

  const author = document.createElement("p");
  author.className = "font-semibold text-sm text-gray-600";
  author.textContent = image.author;

  infoContainer.appendChild(title);
  infoContainer.appendChild(author);

  card.appendChild(infoContainer);

  // Evento de la tarjeta
  card.onclick = () => {
    onImageClick({
      url: image.url,
      title: image.title,
    });
  };

  return {
    element: card,
    // Aqui va cualquier funcion que necesite:
    // isFavorite --> Es favorita la imagen??
    // setFavorite --> Convertir en favorita la imagen
  };
}

export function createImageGrid(images, onImageClick, onFavoriteToggle) {
  // Creamos un map privado que guarde las tarjetas.
  const cards = new Map();

  const grid = document.createElement("div");
  grid.className = "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6";

  // Crear cada tarjeta con createImageCard
  images.forEach((image) => {
    const cardComponent = createImageCard(
      image,
      onImageClick,
      onFavoriteToggle
    );

    cards.set(image.id, cardComponent);
    grid.appendChild(cardComponent.element);
  });

  return {
    element: grid,
  };
}
