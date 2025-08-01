const normalizeData = {
  post: {
    tags: ["Data"],
    summary: "Normalizar datos JSON",
    description: "Normaliza la estructura de los archivos JSON de ventas y gastos",
    responses: {
      200: {
        description: "Datos normalizados correctamente",
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                message: { type: "string", example: "Datos normalizados correctamente." }
              }
            }
          }
        }
      },
      500: { description: "Error interno del servidor" }
    }
  }
};

export default normalizeData;