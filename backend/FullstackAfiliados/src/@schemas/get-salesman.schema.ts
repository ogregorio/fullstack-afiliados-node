export const SalesmanSchema = {
  type: 'array',
  items: {
    type: 'object',
    properties: {
      name: {
        type: 'string',
        description: 'Joãozinho',
      },
      totalAmount: {
        type: 'number',
        default: 0,
      },
    },
  },
};
