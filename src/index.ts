import "reflect-metadata";
import express, { Express, RequestHandler, Router, Request, Response } from 'express';
import { ApiController } from './types/baseApiController';
import { AnyType } from './types/baseType';
import { ApiMethod } from './constants/apiMethod';
import { ReflectFunctions } from './functions/reflectFunctions';
import { ApiCustomDecoratorName, ApiRouteDefine } from './functions/apiDecorators';

interface ApiExpress extends Express {
    registerController(apiController: ApiController): void;
    onVerifyPermission(req: Request, res: Response, permission: AnyType): Promise<boolean>;
}
/**
 * Add api route
 * @param router 
 * @param method 
 * @param path 
 * @param handlers 
 * @returns 
 */
function addRoute(router: Router, method: string, path: string, ...handlers: Array<RequestHandler>): Router {
    switch (method) {
        case ApiMethod.GET:
            router.get(path, handlers);
            break;
        case ApiMethod.HEAD:
            router.head(path, handlers);
            break;
        case ApiMethod.POST:
            router.post(path, handlers);
            break;
        case ApiMethod.PUT:
            router.put(path, handlers);
            break;
        case ApiMethod.DELETE:
            router.delete(path, handlers);
            break;
        case ApiMethod.CONNECT:
            router.connect(path, handlers);
            break;
        case ApiMethod.OPTIONS:
            router.options(path, handlers);
            break;
        case ApiMethod.TRACE:
            router.trace(path, handlers);
            break;
        case ApiMethod.PATCH:
            router.patch(path, handlers);
            break;
        default:
            router.all(path, handlers);
            break;
    }
    return router;
}

const apiExpress = express() as ApiExpress;

/**
 * Register api controller
 */
apiExpress.registerController = (apiController: ApiController) => {
    let router = Router();
    const functions = Object.getPrototypeOf(apiController);
    const functionNames = getAllMethodNames(functions);
    for (const name of functionNames) {
        if (name != 'constructor') {
            const functionImplementation = functions[name];
            const apiRouteDecoratorList = ReflectFunctions.getDecorators(ApiCustomDecoratorName.ApiRoute, apiController, name);
            if (apiRouteDecoratorList && apiRouteDecoratorList.length > 0) {
                const apiRouteDecorator = JSON.parse(apiRouteDecoratorList[0]) as ApiRouteDefine;
                router = addRoute(router, apiRouteDecorator.method, apiRouteDecorator.path, ...[
                    verifyPermission(apiRouteDecorator.permission ? apiRouteDecorator.permission : ''),
                    functionImplementation.bind(apiController)]);
            }
        }
    }
    apiExpress.use("/" + apiController.controllerName + "/", router);
};


const getAllMethodNames = (obj: AnyType) => {
    let props: AnyType = [];
    do {
        const l = Object.getOwnPropertyNames(obj)
            .concat(Object.getOwnPropertySymbols(obj).map(s => s.toString()))
            .sort()
            .filter((p, i, arr) =>
                typeof obj[p] === 'function' &&  //only the methods
                p !== 'constructor' &&           //not the constructor
                (i == 0 || p !== arr[i - 1]) &&  //not overriding in this prototype
                props.indexOf(p) === -1          //not overridden in a child
            )
        props = props.concat(l);
    }
    while (
        (obj = Object.getPrototypeOf(obj)) &&   //walk-up the prototype chain
        Object.getPrototypeOf(obj)              //not the the Object prototype methods (hasOwnProperty, etc...)
    )

    return props
}

/**
 * Verify permission
 * @param permission 
 * @returns 
 */
export function verifyPermission(permission: string): RequestHandler {
    return async (req, res, next) => {
        if (typeof apiExpress.onVerifyPermission != 'undefined') {
            const permit = await apiExpress.onVerifyPermission(req, res, permission);
            if (permit) {
                next();
            }
        }
        else {
            next();
        }
    };
}

export default apiExpress;

/**
 * Export constants
 */
export * from './constants/apiMethod';
export * from './constants/statusCode';

/**
 * Export functions
 */
export * from './functions/apiDecorators';
export * from './functions/commonFunctions';
export * from './functions/reflectFunctions';

/**
 * Export types
 */
export * from './types/baseApiController';
export * from './types/basePermission';
export * from './types/baseType';