const swaggerAutogen = require('swagger-autogen')();

const doc = {
    info: {
        title: "Users Api",
        description: "Users Api"
    },
    host: "localhost:3000",
    schemes: ['http', 'https']
}

const outputFile = './swagger.json';
const endPointFiles = ['./routes/index.js'];

swaggerAutogen(outputFile, endPointFiles, doc)