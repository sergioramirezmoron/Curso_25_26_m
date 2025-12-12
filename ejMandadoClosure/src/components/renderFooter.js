export const renderFooter = () => {
  const footer = document.createElement("footer");
  const copy = document.createElement("p");
  copy.textContent = "2025. Todos los derechos reservados. Sergio Ramírez.";
  footer.appendChild(copy);
  return footer;
};
