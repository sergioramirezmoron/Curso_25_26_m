import { renderFooter } from "./renderFooter";
import { renderHeader } from "./renderHeader";
import { renderSearch } from "./renderSearch";

export const renderMain = () => {
  const container = document.createElement("main");
  container.id = "main";
  container.appendChild(renderHeader());
  container.appendChild(renderSearch());
  container.appendChild(renderFooter());

  return container;
};
