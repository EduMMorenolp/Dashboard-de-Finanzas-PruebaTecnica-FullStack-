const Expense = {
  type: "object",
  required: ["currency", "amount", "date", "description", "provider"],
  properties: {
    id: {
      type: "integer",
      description: "ID único del gasto",
      example: 1
    },
    currency: {
      type: "string",
      enum: ["ARS", "USD"],
      description: "Moneda del gasto",
      example: "ARS"
    },
    // amazonq-ignore-next-line
    amount: {
      type: "number",
      minimum: 0,
      description: "Monto del gasto",
      example: 250000
    },
    date: {
      type: "string",
      format: "date",
      description: "Fecha del gasto",
      example: "2025-01-15"
    },
    description: {
      type: "string",
      description: "Descripción del gasto",
      example: "Alquiler"
    },
    provider: {
      type: "string",
      description: "Proveedor del servicio/producto",
      example: "Proveedor A"
    }
  }
};

export default Expense;