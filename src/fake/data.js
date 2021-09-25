export default {
  fields: {
    country: {
      type: 'string',
      ops: ['==', 'in', '!==', 'not in'],
      choices: {
        RU: 'Russia',
        DE: 'Germany',
        CY: 'Cyprus',
      },
    },
    id: {
      type: 'number',
      ops: ['==', '!=='],
    },
    name: {
      type: 'string',
      ops: ['==', '!=='],
    },
  },
};
