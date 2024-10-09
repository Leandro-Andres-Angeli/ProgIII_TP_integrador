const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'Reclamos',
    description: 'Documentación',
  },
  host: 'localhost:3001',
  schemes: ['http'],
};

const outputFile = './swagger-output.json';
const endpointsFiles = ['./server.js'];

swaggerAutogen(outputFile, endpointsFiles, doc);
