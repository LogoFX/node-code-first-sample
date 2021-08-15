/* eslint-disable no-redeclare */
import { createExpressServer, getMetadataArgsStorage, RoutingControllersOptions, useContainer } from 'routing-controllers';
import { Container } from 'aurelia-dependency-injection';
import { initialize } from 'aurelia-pal-nodejs';
import { AureliaIocAdapter } from './aurelia-ioc-adapter';
import { Express } from 'express';
import { validationMetadatasToSchemas } from 'class-validator-jsonschema';
import { routingControllersToSpec } from 'routing-controllers-openapi';
import * as swaggerUiExpress from 'swagger-ui-express';
import { defaultMetadataStorage as classTransformerDefaultMetadataStorage } from 'class-transformer/cjs/storage';


export const IExpress = Symbol('IExpress');

export interface IExpress extends Express {}

export class Bootstrapper {

    public bootstrap(): void {
        
        initialize();
        new Container().makeGlobal();
                
        const adapter = new AureliaIocAdapter();
        useContainer(adapter);
        
        const routingControllersOptions: RoutingControllersOptions = {
            cors: true,
            controllers: [__dirname + '/controllers/*{.controller.js,.controller.ts}'],
            defaults: {
                nullResultCode: 404,
                undefinedResultCode: 404
            },
            validation: true
        };

        const workhorse: Express = createExpressServer(routingControllersOptions);

        Container.instance.registerInstance(IExpress, workhorse);

        // Parse class-validator classes into JSON Schema:
        const schemas = validationMetadatasToSchemas({
            classTransformerMetadataStorage: classTransformerDefaultMetadataStorage,
            refPointerPrefix: '#/components/schemas/',
        });
  
        // Parse routing-controllers classes into OpenAPI spec:
        const storage = getMetadataArgsStorage();
        const spec = routingControllersToSpec(storage, routingControllersOptions, {
            components: {
            schemas,
            securitySchemes: {
                basicAuth: {
                    scheme: 'basic',
                    type: 'http',
                },
            },
            },
            info: {
                description: 'Generated with `routing-controllers-openapi`',
                title: 'A sample API',
                version: '1.0.0',
            },
        });

        //console.log(spec);

        workhorse.use('/docs', swaggerUiExpress.serve, swaggerUiExpress.setup(spec));
        
        // Render spec on root:
        workhorse.get('/', (_req, res) => {
            res.json(spec);
        });

        workhorse.listen(3000);

        console.log('The server running om http://127.0.0.1:3000');
    }
}

  