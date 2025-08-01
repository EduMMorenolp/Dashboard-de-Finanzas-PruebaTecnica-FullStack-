const getChartData = {
  get: {
    tags: ["Metrics"],
    summary: "Obtener datos para gráfico",
    description: "Retorna datos de ventas y gastos para gráficos de línea",
    parameters: [
      {
        name: "period",
        in: "query",
        schema: { 
          type: "string", 
          enum: ["day", "week", "month", "year"],
          default: "month"
        },
        description: "Período de tiempo para filtrar datos"
      }
    ],
    responses: {
      200: {
        description: "Datos del gráfico obtenidos exitosamente",
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                sales: {
                  type: "array",
                  items: {
                    type: "object",
                    properties: {
                      date: { type: "string", format: "date" },
                      amount: { type: "number" },
                      currency: { type: "string" }
                    }
                  }
                },
                expenses: {
                  type: "array",
                  items: {
                    type: "object",
                    properties: {
                      date: { type: "string", format: "date" },
                      amount: { type: "number" },
                      currency: { type: "string" }
                    }
                  }
                }
              }
            }
          }
        }
      },
      500: { description: "Error interno del servidor" }
    }
  }
};

export default getChartData;