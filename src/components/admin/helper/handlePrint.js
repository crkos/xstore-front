import jsPDF from "jspdf";

/***
 * Función que permite imprimir una tabla en un documento PDF
 * @param nombreDoc {string} Nombre del documento
 * @param idTabla {string} Id de la tabla a imprimir
 * @param orientacion  {string} Orientación del documento
 * @returns {VoidFunction} No retorna nada
 */
const handlePrint = (nombreDoc, idTabla, orientacion = "portrait") => {
  const doc = new jsPDF({
    orientation: orientacion === "paisaje" ? "landscape" : "portrait",
  });

  const tableElement = document.getElementById(idTabla);

  const tableHeaders = Array.from(tableElement.querySelectorAll("th")).map(
    (header) => header.textContent
  );

  // Convierte la tabla en un objeto de datos
  const tableData = doc.autoTableHtmlToJson(tableElement);

  // Genera el documento PDF
  doc.autoTable({
    head: [tableHeaders], // Usa los encabezados de la tabla
    body: tableData.data,
  });

  doc.save(nombreDoc);
};

export default handlePrint;
