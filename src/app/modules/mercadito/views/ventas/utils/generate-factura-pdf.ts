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
    nula: boolean;
  };
  cliente: {
    nombre: string;
    telefono: string;
    identificacion: string;
  };
  productos: {
    codigo: string;
    nombre: string;
    cantidad: number;
    precio: number;
  }[];
  empleado: {
    nombre: string;
  };
  tipoPago: string;
}) => {
  const { factura, cliente, tipoPago, productos, empleado } = props;

  const subtotal = productos.reduce(
    (acc, producto) => acc + producto.cantidad * producto.precio,
    0
  );

  const porcentajeImpuesto = 0.15;
  const impuesto = subtotal * porcentajeImpuesto;

  const total = subtotal + impuesto;

  const dd: TDocumentDefinitions = {
    content: [
      {
        columns: [
          {
            image: logoBase64,
            width: 150,
          },
          [
            {
              text: 'Factura',
              color: '#333333',
              // width: '*',
              fontSize: 28,
              bold: true,
              alignment: 'right',
              margin: [0, 0, 0, 15],
            },
            {
              stack: [
                {
                  columns: [
                    {
                      text: 'Factura No.',
                      color: '#aaaaab',
                      bold: true,
                      width: '*',
                      fontSize: 12,
                      alignment: 'right',
                    },
                    {
                      text: `YZYTM-${factura.id}`,
                      bold: true,
                      color: '#333333',
                      fontSize: 12,
                      alignment: 'right',
                      width: 100,
                    },
                  ],
                },
                {
                  columns: [
                    {
                      text: 'Fecha',
                      color: '#aaaaab',
                      bold: true,
                      width: '*',
                      fontSize: 12,
                      alignment: 'right',
                    },
                    {
                      text: `${new Date(factura.createdAt).toDateString()}`,
                      bold: true,
                      color: '#333333',
                      fontSize: 12,
                      alignment: 'right',
                      width: 100,
                    },
                  ],
                },
                {
                  columns: [
                    {
                      text: 'Estado',
                      color: '#aaaaab',
                      bold: true,
                      fontSize: 12,
                      alignment: 'right',
                      width: '*',
                    },
                    {
                      text: factura.nula ? 'ANULADA' : 'PAGADA',
                      bold: true,
                      fontSize: 14,
                      alignment: 'right',
                      color: factura.nula ? 'red' : 'green',
                      width: 100,
                    },
                  ],
                },
              ],
            },
          ],
        ],
      },
      {
        columns: [
          {
            text: 'De',
            color: '#aaaaab',
            bold: true,
            fontSize: 14,
            alignment: 'left',
            margin: [0, 20, 0, 5],
          },
          {
            text: 'A',
            color: '#aaaaab',
            bold: true,
            fontSize: 14,
            alignment: 'left',
            margin: [0, 20, 0, 5],
          },
        ],
      },
      {
        columns: [
          {
            text: `${empleado.nombre} \n Galope`,
            bold: true,
            color: '#333333',
            alignment: 'left',
          },
          {
            text: `${cliente.nombre}`,
            bold: true,
            color: '#333333',
            alignment: 'left',
          },
        ],
      },
      {
        columns: [
          {
            text: 'Datos',
            color: '#aaaaab',
            bold: true,
            margin: [0, 7, 0, 3],
          },
          {
            text: 'Datos',
            color: '#aaaaab',
            bold: true,
            margin: [0, 7, 0, 3],
          },
        ],
      },
      {
        columns: [
          {
            text: `Tienda Galope - La Quezada \n ${tipoPago}`,
            style: 'invoiceBillingAddress',
          },
          {
            text: `${cliente.identificacion} \n ${cliente.telefono} \n   HN`,
            style: 'invoiceBillingAddress',
          },
        ],
      },
      '\n\n',
      {
        // width: '100%',
        alignment: 'center',
        text: `Factura No.  YZYTM-${factura.id}`,
        bold: true,
        margin: [0, 10, 0, 10],
        fontSize: 15,
      },
      {
        layout: {
          defaultBorder: false,
          hLineWidth: function () {
            return 1;
          },
          vLineWidth: function () {
            return 1;
          },
          hLineColor: function (i: number) {
            if (i === 1 || i === 0) {
              return '#bfdde8';
            }
            return '#eaeaea';
          },
          vLineColor: function () {
            return '#eaeaea';
          },
          hLineStyle: function () {
            // if (i === 0 || i === node.table.body.length) {
            return null;
            //}
          },
          // vLineStyle: function (i, node) { return {dash: { length: 10, space: 4 }}; },
          paddingLeft: function () {
            return 10;
          },
          paddingRight: function () {
            return 10;
          },
          paddingTop: function () {
            return 2;
          },
          paddingBottom: function () {
            return 2;
          },
          fillColor: function () {
            return '#fff';
          },
        },
        table: {
          headerRows: 1,
          widths: ['auto', '*', 'auto', 'auto', 'auto'],
          body: [
            [
              {
                text: 'Codigo',
                fillColor: '#eaf2f5',
                border: [false, true, false, true],
                margin: [0, 5, 0, 5],
                textTransform: 'uppercase',
              },
              {
                text: 'Producto',
                fillColor: '#eaf2f5',
                border: [false, true, false, true],
                margin: [0, 5, 0, 5],
                textTransform: 'uppercase',
              },
              {
                text: 'Cantidad',
                fillColor: '#eaf2f5',
                border: [false, true, false, true],
                margin: [0, 5, 0, 5],
                textTransform: 'uppercase',
              },
              {
                text: 'Precio Unitario',
                fillColor: '#eaf2f5',
                border: [false, true, false, true],
                margin: [0, 5, 0, 5],
                textTransform: 'uppercase',
              },
              {
                text: 'Total',
                border: [false, true, false, true],
                alignment: 'right',
                fillColor: '#eaf2f5',
                margin: [0, 5, 0, 5],
                textTransform: 'uppercase',
              },
            ],
            ...productos.map((producto) => [
              {
                text: producto.codigo,
                border: [false, false, false, true],
                margin: [0, 5, 0, 5],
                alignment: 'left',
              },
              {
                text: producto.nombre,
                border: [false, false, false, true],
                margin: [0, 5, 0, 5],
                alignment: 'left',
              },
              {
                text: producto.cantidad,
                border: [false, false, false, true],
                margin: [0, 5, 0, 5],
                alignment: 'left',
              },
              {
                text: `L. ${producto.precio.toFixed(2)}`,
                border: [false, false, false, true],
                margin: [0, 5, 0, 5],
                alignment: 'left',
              },
              {
                border: [false, false, false, true],
                text: `L. ${(producto.cantidad * producto.precio).toFixed(2)}`,
                fillColor: '#f5f5f5',
                alignment: 'right',
                margin: [0, 5, 0, 5],
              },
            ]),
          ],
        },
      },
      '\n',
      '\n\n',
      {
        layout: {
          defaultBorder: false,
          hLineWidth: function () {
            return 1;
          },
          vLineWidth: function () {
            return 1;
          },
          hLineColor: function () {
            return '#eaeaea';
          },
          vLineColor: function () {
            return '#eaeaea';
          },
          hLineStyle: function () {
            return null;
          },
          paddingLeft: function () {
            return 10;
          },
          paddingRight: function () {
            return 10;
          },
          paddingTop: function () {
            return 3;
          },
          paddingBottom: function () {
            return 3;
          },
          fillColor: function () {
            return '#fff';
          },
        },
        table: {
          headerRows: 1,
          widths: ['*', 'auto'],
          body: [
            [
              {
                text: 'Subtotal',
                border: [false, true, false, true],
                alignment: 'right',
                margin: [0, 5, 0, 5],
              },
              {
                border: [false, true, false, true],
                text: `L. ${subtotal}`,
                alignment: 'right',
                fillColor: '#f5f5f5',
                margin: [0, 5, 0, 5],
              },
            ],
            [
              {
                text: 'Impuesto',
                border: [false, false, false, true],
                alignment: 'right',
                margin: [0, 5, 0, 5],
              },
              {
                text: `L. ${impuesto.toFixed(2)} - (15%)`,
                border: [false, false, false, true],
                fillColor: '#f5f5f5',
                alignment: 'right',
                margin: [0, 5, 0, 5],
              },
            ],
            [
              {
                text: 'Total',
                bold: true,
                fontSize: 20,
                alignment: 'right',
                border: [false, false, false, true],
                margin: [0, 5, 0, 5],
              },
              {
                text: `L. ${total}`,
                bold: true,
                fontSize: 20,
                alignment: 'right',
                border: [false, false, false, true],
                fillColor: '#f5f5f5',
                margin: [0, 5, 0, 5],
              },
            ],
          ],
        },
      },
      '\n\n',
      {
        text: 'Notas',
        style: 'notesTitle',
      },
      {
        text: 'LA FACTURA ES UN BENEFICIO DE TODOS, ¡EXIJALA!',
        style: 'notesText',
      },
    ],
    styles: {
      notesTitle: {
        fontSize: 10,
        bold: true,
        margin: [0, 50, 0, 3],
      },
      notesText: {
        fontSize: 10,
      },
    },
    defaultStyle: {
      columnGap: 20,
      //font: 'Quicksand',
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

    const pdf = createPdf(dd);

    pdf.open();
  } catch (error) {
    console.error('Error al generar la factura', error);
  }
};
