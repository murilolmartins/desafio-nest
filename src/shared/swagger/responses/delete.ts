export const DeleteSwagger = (message: string) => ({
  status: 200,
  content: {
    'application/json': {
      schema: {
        type: 'object',
        properties: {
          message: {
            type: 'string',
            example: message,
          },
          statusCode: {
            type: 'number',
            example: 200,
          },
        },
      },
    },
  },
});
