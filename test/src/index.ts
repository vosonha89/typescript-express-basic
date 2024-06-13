import express from "express";
import apiExpress from 'typescript-express-basic';
import expressJSDocSwagger from 'express-jsdoc-swagger';
import { PublicController } from './controllers/publicController';

const port = 3000;
let app = apiExpress;
app.use(express.json());

// Register controller
app.registerController(new PublicController());

const options = {
    info: {
        version: '1.0.0',
        title: 'Typescript Express Basic Example',
        license: {
            name: 'MIT',
        },
    },
    security: {
    },
    baseDir: __dirname,
    // Glob pattern to find your jsdoc files (multiple patterns can be added in an array)
    filesPattern: './**/*.ts',
    // URL where SwaggerUI will be rendered
    swaggerUIPath: '/api-docs',
    // Expose OpenAPI UI
    exposeSwaggerUI: true,
    // Expose Open API JSON Docs documentation in `apiDocsPath` path.
    exposeApiDocs: false,
    // Open API JSON Docs endpoint.
    apiDocsPath: '/v3/api-docs',
    // Set non-required fields as nullable by default
    notRequiredAsNullable: false,
    // You can customize your UI options.
    // you can extend swagger-ui-express config. You can checkout an example of this
    // in the `example/configuration/swaggerOptions.js`
    swaggerUiOptions: {},
    // multiple option in case you want more that one instance
    multiple: true,
};

expressJSDocSwagger(app)(options);

app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
});