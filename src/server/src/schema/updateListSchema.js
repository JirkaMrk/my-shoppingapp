module.exports = { // update list schema
  type: 'object',
  properties: {
    name: { type: 'string' },
    note: { type: 'string' },
    activeList: { type: 'boolean' },
    ownerId: { type: 'string' },
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
    _id: { type: 'string' },
  },
  required: [ 'listId', 'name', 'activeList', 'ownerId' ],
};