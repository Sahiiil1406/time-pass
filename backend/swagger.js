const swaggerAutogen = require('swagger-autogen')()

const doc={
    info:{
        title:"Synkerr App API",
        description:"This is a simple API for a Synkerr App",
    },
    host:"localhost:1406",
    schemes:['http'],

}
const outputFile = './swagger.json'
const endpointsFiles = ['./index.js']

swaggerAutogen(outputFile, endpointsFiles, doc)