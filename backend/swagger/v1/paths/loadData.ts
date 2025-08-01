const loadData = {
  post: {
    tags: ["Data"],
    summary: "Cargar datos desde JSON",
    description: "Carga ventas y gastos desde archivos JSON",
    responses: {
      200: {
        description: "Datos cargados correctamente",
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                message: { type: "string" },
                results: {
                  type: "object",
                  properties: {
                    sales: { type: "integer" },
                    expenses: { type: "integer" }
                  }
                }
              }
            }
          }
        }
      },
      207: {
        description: "Carga parcial completada"
      },
      500: {
        description: "Error interno del servidor"
      }
    }
  }
};

export default loadData;