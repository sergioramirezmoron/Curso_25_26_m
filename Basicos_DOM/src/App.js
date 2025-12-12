import { createBookingCoches } from "./helpers/bookingCoches";

export default function createApp() {
  const appDiv = document.getElementById("app");
  appDiv.appendChild(createBookingCoches().render());
}
