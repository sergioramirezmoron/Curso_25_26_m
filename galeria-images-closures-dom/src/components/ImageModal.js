export default function createImageModal(image) {
  const modal = document.createElement("div");
  modal.className =
    "fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center z-50";

  // Contenedor para la imagen modal
  const modalContent = document.createElement("div");
  modalContent.className = "bg-white rounded-lg shadow-lg p-6 max-w-5xl w-full";

  // Imagen modal
  const modalImage = document.createElement("img");
  modalImage.src = image.url;
  modalImage.alt = image.title;
  modalImage.className = "w-full";

  modalContent.appendChild(modalImage);

  // Boton de salir
  const closeButton = document.createElement("button");
  closeButton.className =
    "absolute top-4 right-4 text-gray-600 hover:text-gray-800 cursor-pointer text-2xl font-bold";
  closeButton.textContent = "✕";

  modal.appendChild(closeButton);
  modal.appendChild(modalContent);

  // Botón para cerrar imagen modal
  // Que sea click o que pulse la tecla ESC

  closeButton.addEventListener("click", () => {
    modal.remove();
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      modal.remove();
    }
  });

  return {
    element: modal,
  };
}
