import {
  buscarCanciones,
  crearCatalogo,
  generarEstadisticasMusicales,
} from "./helpers/bibliotecaMusical";

function app() {
  crearCatalogo();
  const stats = generarEstadisticasMusicales();
  console.log("=== ESTADÍSTICAS MUSICALES ===");
  console.log(`Total de canciones: ${stats.totalCanciones()}`);
  console.log(`Duración total: ${stats.duracionTotal()} minutos`);
  console.log(`Canción más reproducida: 
${stats.cancionMasReproducida().titulo}`);
  console.log(`Artistas únicos: ${stats.artistasUnicos()}`);
  console.log(`Año promedio: ${stats.añoPromedio()}`);
  console.log("\nGéneros:");
  console.table(stats.generosPorCantidad());
  console.log("\nDistribución por década:");
  console.table(stats.distribucionDecadas());
}
export default app;
