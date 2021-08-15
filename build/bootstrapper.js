"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Bootstrapper = exports.IExpress = void 0;
const tslib_1 = require("tslib");
/* eslint-disable no-redeclare */
const routing_controllers_1 = require("routing-controllers");
const aurelia_dependency_injection_1 = require("aurelia-dependency-injection");
const aurelia_pal_nodejs_1 = require("aurelia-pal-nodejs");
const aurelia_ioc_adapter_1 = require("./aurelia-ioc-adapter");
const class_validator_jsonschema_1 = require("class-validator-jsonschema");
const routing_controllers_openapi_1 = require("routing-controllers-openapi");
const swaggerUiExpress = tslib_1.__importStar(require("swagger-ui-express"));
const storage_1 = require("class-transformer/cjs/storage");
exports.IExpress = Symbol('IExpress');
class Bootstrapper {
    bootstrap() {
        aurelia_pal_nodejs_1.initialize();
        new aurelia_dependency_injection_1.Container().makeGlobal();
        const adapter = new aurelia_ioc_adapter_1.AureliaIocAdapter();
        routing_controllers_1.useContainer(adapter);
        const routingControllersOptions = {
            cors: true,
            controllers: [__dirname + '/controllers/*{.controller.js,.controller.ts}'],
            defaults: {
                nullResultCode: 404,
                undefinedResultCode: 404
            },
            validation: true
        };
        const workhorse = routing_controllers_1.createExpressServer(routingControllersOptions);
        aurelia_dependency_injection_1.Container.instance.registerInstance(exports.IExpress, workhorse);
        // Parse class-validator classes into JSON Schema:
        const schemas = class_validator_jsonschema_1.validationMetadatasToSchemas({
            classTransformerMetadataStorage: storage_1.defaultMetadataStorage,
            refPointerPrefix: '#/components/schemas/',
        });
        // Parse routing-controllers classes into OpenAPI spec:
        const storage = routing_controllers_1.getMetadataArgsStorage();
        const spec = routing_controllers_openapi_1.routingControllersToSpec(storage, routingControllersOptions, {
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
exports.Bootstrapper = Bootstrapper;
//# sourceMappingURL=bootstrapper.js.map