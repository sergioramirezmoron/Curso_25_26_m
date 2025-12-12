import { fetching, parseData } from "../helpers/fetching";
import { renderCard } from "./renderCard";

export const renderSearch = () => {
  const container = document.createElement("div");
  //Input
  const input = document.createElement("input");
  input.type = "text";
  //Boton de buscar
  const btnSearch = document.createElement("button");
  btnSearch.textContent = "Buscar";

  let main;

  input.addEventListener("keypress", async (e) => {
    if (e.key === "Enter") {
      document
        .getElementById("main")
        .appendChild(renderCard(parseData(await fetching(input.value))));
    }
  });

  btnSearch.addEventListener("click", async () =>
    document
      .getElementById("main")
      .appendChild(renderCard(parseData(await fetching(input.value))))
  );

  container.appendChild(input);
  container.appendChild(btnSearch);

  return container;
};
