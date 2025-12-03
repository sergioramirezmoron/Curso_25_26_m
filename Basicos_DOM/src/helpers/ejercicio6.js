import fetching from "../utils/fetching";
export const createEjercicio6 = () => {
  //Closure Scope

  //renderTable

  const renderTable = (arrayUsuarios) => {
    const container = document.createElement("div");
    container.classList.add("users-container");

    arrayUsuarios.forEach((user) => {
      const card = document.createElement("div");
      card.classList.add("user-card");

      const name = document.createElement("h2");
      name.classList.add("user-name");
      name.textContent = user.nombre;

      const info = document.createElement("h4");
      info.classList.add("user-info");

      const edad = document.createElement("p");
      edad.textContent = user.edad;

      const email = document.createElement("p");
      email.textContent = user.email;

      info.appendChild(edad);
      info.appendChild(email);

      const skillContainer = document.createElement("div");
      skillContainer.classList.add("skills-container");

      user.habilidades.forEach((skill) => {
        const skillElement = document.createElement("p");
        skillElement.classList.add("skill-tag");
        skillElement.textContent = skill;
        skillContainer.appendChild(skillElement);
      });

      const nivel = document.createElement("div");
      nivel.classList.add("level-badge");
      if (user.nivel.toLowerCase() === "senior") {
        nivel.classList.add("senior");
      } else if (user.nivel.toLowerCase() === "junior") {
        nivel.classList.add("junior");
      }
      nivel.textContent = user.nivel;

      card.appendChild(name);
      card.appendChild(info);
      card.appendChild(skillContainer);
      card.appendChild(nivel);
      container.appendChild(card);
    });
    return container;
  };

  //render
  const render = () => {
    const mainContainer = document.createElement("div");
    const v1Wrapper = document.createElement("div");
    v1Wrapper.innerHTML = "<h3>Formulario de búsqueda de usuarios</h3>";
    fetching("usuariosConHabilidades")
      .then((data) => {
        v1Wrapper.appendChild(renderTable(data));
      })
      .catch((err) => {
        console.log("Error: ", err);
        throw err;
      });
    mainContainer.appendChild(v1Wrapper);
    return mainContainer;
  };

  return { render };
};
