import jsPDF from "jspdf";

/***
 * Función que permite imprimir una tabla en un documento PDF
 * @param nombreDoc Nombre del documento
 * @param idTabla Id de la tabla a imprimir
 * @returns {VoidFunction} No retorna nada
 */
const handlePrint = (nombreDoc, idTabla) => {
  const doc = new jsPDF();

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
