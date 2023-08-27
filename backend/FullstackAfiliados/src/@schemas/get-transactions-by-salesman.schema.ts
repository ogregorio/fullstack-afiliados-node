export const TransactionSchema = {
  type: 'array',
  items: {
    type: 'object',
    properties: {
      type: {
        type: 'number',
        default: 1,
      },
      typeId: {
        type: 'string',
        example: '74f9fd0a-86c7-4e39-8a1c-8c39219997e5',
      },
      date: {
        type: 'string',
        format: 'date-time',
        example: '2023-08-25T01:12:16.901Z',
      },
      product: {
        type: 'string',
        example: 'DESENVOLVEDOR FULLSTACK',
      },
      amount: {
        type: 'number',
        example: 1000,
      },
      salesman: {
        type: 'string',
        example: 'Salesman Name',
      },
    },
  },
};
