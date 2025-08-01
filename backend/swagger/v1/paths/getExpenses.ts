const getExpenses = {
  get: {
    tags: ["Expenses"],
    summary: "Obtener todos los gastos",
    description: "Retorna una lista de todos los gastos registrados",
    responses: {
      200: {
        description: "Lista de gastos obtenida exitosamente",
        content: {
          "application/json": {
            schema: {
              type: "array",
              items: {
                $ref: "#/components/schemas/Expense"
              }
            }
          }
        }
      },
      500: {
        description: "Error interno del servidor"
      }
    }
  }
};

export default getExpenses;