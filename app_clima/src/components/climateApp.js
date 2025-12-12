export default function climateClimaApp() {
  //DOM
  const container = document.createElement("div");
  container.className = "";

  //header
  const header = document.createElement("header");

  //main
  const main = document.createElement("main");

  // Funcionalidades
  const searchCard = createSearchCard(callback);

  //pintamos todo en el DOM
  container.appendChild(header);
  container.appendChild(main);

  /* return (
    <div>climateApp</div>
  ) */
}
