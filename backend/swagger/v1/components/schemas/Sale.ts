const Sale = {
  type: "object",
  required: ["id_venta", "currency", "amount", "date", "description", "client"],
  properties: {
    id: {
      type: "integer",
      description: "ID único de la venta",
      example: 1
    },
    id_venta: {
      type: "string",
      description: "Identificador de la venta",
      example: "IMP-001"
    },
    currency: {
      type: "string",
      enum: ["ARS", "USD"],
      description: "Moneda de la venta",
      example: "USD"
    },
    amount: {
      type: "number",
      minimum: 0,
      description: "Monto de la venta",
      example: 1500.50
    },
    date: {
      type: "string",
      format: "date",
      description: "Fecha de la venta",
      example: "2025-01-15"
    },
    description: {
      type: "string",
      description: "Descripción del producto/servicio",
      example: "Smartphone"
    },
    client: {
      type: "string",
      description: "Nombre del cliente",
      example: "Juan Pérez"
    }
  }
};

export default Sale;