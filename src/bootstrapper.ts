/* eslint-disable no-redeclare */
import { createExpressServer, getMetadataArgsStorage, HttpError, RoutingControllersOptions, useContainer } from 'routing-controllers';
import { Container } from 'aurelia-dependency-injection';
import { initialize } from 'aurelia-pal-nodejs';
import { AureliaIocAdapter } from './aurelia-ioc-adapter';
import { Express } from 'express';
import { validationMetadatasToSchemas } from 'class-validator-jsonschema';
import { routingControllersToSpec } from 'routing-controllers-openapi';
import * as swaggerUiExpress from 'swagger-ui-express';
import { defaultMetadataStorage as classTransformerDefaultMetadataStorage } from 'class-transformer/cjs/storage';
import { StatusCodes } from 'http-status-codes';

export class RequestTimeoutError extends HttpError {

    constructor(message: string = 'Request Timeout.') {
        super(StatusCodes.REQUEST_TIMEOUT);
        this.name = 'RequestTimeoutError';
        Object.setPrototypeOf(this, RequestTimeoutError.prototype);
        if (message)
            this.message = message;
    }
}

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

        const timeOut = 1000 * 60 * 10;
        workhorse
            .use('/docs', swaggerUiExpress.serve, swaggerUiExpress.setup(spec))
            .use((req, res, next) => {
                req.setTimeout(timeOut, () => {
                    const error = new RequestTimeoutError();
                    next(error);
                });
                res.setTimeout(timeOut, () => {
                    const error = new Error('Request has expired.');
                    //error.status = StatusCodes.SERVICE_UNAVAILABLE;
                    next(error);
                });
                next();
            });

        // Render spec on root:
        workhorse.get('/', (_req, res) => {
            res.json(spec);
        });

        //TODO: Inject port number using dotenv or any other config provider option
        let port = 3001;

        workhorse.listen(port);

        console.log(`The server running om http://127.0.0.1:${port}`);
    }
}

  