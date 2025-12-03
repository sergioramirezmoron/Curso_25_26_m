import { createProyectoBooking } from "./helpers/proyectoBooking";

export default function createApp() {
  const appDiv = document.getElementById("app");
  appDiv.appendChild(createProyectoBooking().render());
}
