import { imagesData } from "../data/images";
import { createImageGrid } from "./ImageCard";
import createImageModal from "./ImageModal";

export default function createGalleryApp() {
  // Contenedor principal
  const container = document.createElement("div");
  container.className =
    "min-h-screen bg-linear-to-br from-purple-100 via-white to-pink-700";

  // ------------- Header -------------
  const header = document.createElement("header");
  header.className = "bg-white shadow-lg sticky top-0 z-40";

  const headerContentDiv = document.createElement("div");
  headerContentDiv.className = "max-w-7xl mx-auto px-6 py-6 text-center";

  const headerTitle = document.createElement("h1");
  headerTitle.className = "text-3xl font-bold text-purple-800 mb-2";
  headerTitle.textContent = "🎨 Galería de Imagenes";

  const headerSubtitle = document.createElement("p");
  headerSubtitle.className = "text-gray-600";
  headerSubtitle.textContent =
    "Aprende closures, funciones fábrica y manipulación del DOM";

  headerContentDiv.appendChild(headerTitle);
  headerContentDiv.appendChild(headerSubtitle);
  header.appendChild(headerContentDiv);

  // ------------- Main -------------
  const main = document.createElement("main");
  main.className = "max-w-7xl mx-auto px-6 py-8";

  // Contador de favoritos
  const counterComponent = document.createElement("h2");
  counterComponent.textContent =
    "<----- Aqui ira el componente FavoritesCounter ---->";

  // grid de imágenes
  const gridComponent = document.createElement("h2");
  const imageComponent = createImageGrid(imagesData, (imageData) => {
    const modal = createImageModal(imageData);
    document.body.appendChild(modal.element);
  });
  gridComponent.appendChild(imageComponent.element);

  // Añadimos todo al main
  main.appendChild(counterComponent);
  main.appendChild(gridComponent);

  // ------------- Footer -------------
  const footer = document.createElement("footer");
  footer.className = "bg-gray-900 text-white py-8 mt-12";

  const footerContentDiv = document.createElement("div");
  footerContentDiv.className = "max-w-7xl mx-auto px-6 text-center";

  const footerName = document.createElement("h3");
  footerName.className = "text-2xl font-bold mb-2";
  footerName.textContent = "Sergio Ramírez Morón";

  const footerUrl = document.createElement("a");
  footerUrl.className = "text-gray-400";
  footerUrl.textContent = "Mi GitHub";
  footerUrl.href = "https://github.com/sergioramirezmoron";

  footerContentDiv.appendChild(footerName);
  footerContentDiv.appendChild(footerUrl);
  footer.appendChild(footerContentDiv);

  // Añadimos todo al container
  container.appendChild(header);
  container.appendChild(main);
  container.appendChild(footer);

  return {
    element: container,
  };
}
