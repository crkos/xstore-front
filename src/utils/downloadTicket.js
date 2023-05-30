import { jsPDF } from "jspdf";

export const downloadTicket = (producto, fechaVenta) => {
  const doc = new jsPDF();
  const fecha = new Date(fechaVenta);
  const fechaVentaLocale = fecha.toLocaleDateString("es-MX");

  // Customize the ticket layout
  const ticketContent = `
      Detalles de la compra - Xstore
      ---------------------------
      Clave Venta: ${producto.ventaProducto.clave_venta}
      Producto: ${producto.nombre_producto}
      Precio: ${producto.precio * producto.ventaProducto.cantidad_comprada}
      Cantidad: ${producto.ventaProducto.cantidad_comprada}
      Fecha: ${fechaVentaLocale}
      ---------------------------
      Gracias por su preferencia!
    `;

  doc.text(ticketContent, 10, 10); // Set the content and position of the ticket text
  doc.save("ticket.pdf"); // Save the PDF with the name "ticket.pdf"
};
