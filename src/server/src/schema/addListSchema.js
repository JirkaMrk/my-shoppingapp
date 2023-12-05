module.exports = { // add list schema
    type: 'object',
    properties: {
      name: { type: 'string' },
      note: { type: 'string' },
      activeList: { type: 'boolean' },
      listOfItems: {
        type: 'array',
        items: {
          type: 'object',
          properties: {
            id: { type: 'string' },
            done: { type: 'boolean' },
            listItem: { type: 'string' },
            amount: { type: 'string' },
            units: { type: 'string' },
          },
          required: ['id', 'done', 'listItem'],
        },
      },
    },
    required: [ 'name', 'activeList'],
  };
