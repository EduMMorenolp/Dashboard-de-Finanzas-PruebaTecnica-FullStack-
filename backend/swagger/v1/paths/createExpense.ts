const createExpense = {
  post: {
    tags: ["Expenses"],
    summary: "Crear nuevo gasto",
    description: "Crea un nuevo gasto en el sistema",
    requestBody: {
      required: true,
      content: {
        "application/json": {
          schema: { $ref: "#/components/schemas/Expense" }
        }
      }
    },
    responses: {
      201: {
        description: "Gasto creado exitosamente",
        content: {
          "application/json": {
            schema: { $ref: "#/components/schemas/Expense" }
          }
        }
      },
      400: { description: "Datos inválidos" },
      500: { description: "Error interno del servidor" }
    }
  }
};

export default createExpense;