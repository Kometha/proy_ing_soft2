import { TDocumentDefinitions, TFontDictionary } from 'pdfmake/interfaces';
import { logoBase64 } from './image-galope';
import { createPdf } from 'pdfmake/build/pdfmake';
import { lexendRegularBase64 } from './fonts/lexend-regular-base64';
import { lexendBoldBase64 } from './fonts/lexend-bold-base64';

/**
 * Genera un documento PDF con la factura de una venta
 * @summary Utiliza la biblioteca de pdfmake
 * @param props
 */
export const generarFactura = (props: {
  factura: {
    id: number;
    createdAt: Date;
  };
  cliente: {
    nombre: string;
    identificacion: string;
  };
  productos: {
    nombre: string;
    cantidad: number;
    precio: number;
  }[];
  tipoPago: string;
}) => {
  const { factura, cliente, tipoPago, productos } = props;

  const subtotal = productos.reduce(
    (acc, producto) => acc + producto.cantidad * producto.precio,
    0
  );

  const porcentajeImpuesto = 0.15;
  const impuesto = subtotal * porcentajeImpuesto;

  const total = subtotal + impuesto;

  const definicionParaPdfMake: TDocumentDefinitions = {
    content: [
      {
        image: logoBase64,
        width: 200,
        height: 70,
      },

      {
        text: 'FACTURA',
        style: 'header',
        alignment: 'left',
        margin: [0, 0, 0, 5], // Margin bottom for spacing
      },
      `#YZYTM-${factura.id}\n\n`,
      {
        table: {
          widths: ['*', '*'],
          body: [
            [{ text: 'DNI:', bold: true }, cliente.identificacion],
            [{ text: 'Cliente:', bold: true }, cliente.nombre],
            [{ text: 'Tipo Pago:', bold: true }, tipoPago],
          ],
        },
        layout: 'noBorders',
        margin: [0, 0, 0, 20], // Margin bottom for spacing
      },
      {
        text: 'Detalles',
        style: 'subheader',
        margin: [0, 0, 0, 10], // Margin bottom for spacing
      },
      {
        table: {
          headerRows: 1,
          widths: ['*', 'auto', 'auto', 'auto'],
          body: [
            [
              { text: 'Descripción', style: 'tableHeader' },
              { text: 'Cantidad', style: 'tableHeader' },
              { text: 'Precio', style: 'tableHeader' },
              { text: 'Total', style: 'tableHeader' },
            ],
            ...productos.map((producto) => [
              producto.nombre,
              producto.cantidad,
              `L.${producto.precio.toFixed(2)}`,
              `L.${(producto.cantidad * producto.precio).toFixed(2)}`,
            ]),
          ],
        },
        margin: [0, 0, 0, 20], // Margin bottom for spacing
      },
      {
        text: `Subtotal: L.${subtotal.toFixed(2)}`,
        style: 'subtotalAmount',
      },
      {
        text: `ISV: ${porcentajeImpuesto * 100}% - L.${impuesto.toFixed(2)}`,
        style: 'subtotalAmount',
      },
      {
        text: `Total: L.${total.toFixed(2)}`,
        style: 'totalAmount',
        margin: [0, 0, 0, 120], // Margin bottom for spacing
      },

      {
        text: '"LA FACTURA ES UN BENEFICIO DE TODOS, ¡EXIJALA!"',
        alignment: 'center',
        italics: true,
      },
    ],
    styles: {
      header: {
        fontSize: 22,
        bold: true,
      },
      subheader: {
        fontSize: 18,
        bold: false,
      },
      tableHeader: {
        bold: false,
        fontSize: 13,
        color: 'black',
      },
      subtotalAmount: {
        fontSize: 14,
        bold: true,
        alignment: 'right',
        margin: [0, 10, 0, 0], // Margin top for spacing
      },
      totalAmount: {
        fontSize: 18,
        bold: true,
        alignment: 'right',
        margin: [0, 10, 0, 0], // Margin top for spacing
      },
    },
  };

  const fonts: TFontDictionary = {
    Roboto: {
      normal: 'Lexend-Regular.ttf',
      bold: 'Lexend-Bold.ttf',
      italics: 'Lexend-Regular.ttf',
      bolditalics: 'Lexend-Bold.ttf',
    },
  };

  try {
    // @ts-ignore
    pdfMake.vfs = {
      'Lexend-Regular.ttf': lexendRegularBase64,
      'Lexend-Bold.ttf': lexendBoldBase64,
    };

    // @ts-ignore
    pdfMake.fonts = fonts;

    const pdf = createPdf(definicionParaPdfMake);

    pdf.open();
  } catch (error) {
    console.error('Error al generar la factura', error);
  }
};
