export const renderHeader = () => {
  const header = document.createElement("header");
  const title = document.createElement("h1");
  title.textContent = "App del tiempo";
  header.appendChild(title);
  return header;
};
