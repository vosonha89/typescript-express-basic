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
    const functionNames = Object.getOwnPropertyNames(functions);
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