import "reflect-metadata";
import { AnyType } from '../types/baseType';

/**
 * Custom decorator names for api
 */
export class ApiCustomDecoratorName {
    public static readonly ApiRoute = "custom:anotations:apiRoute";
}

/**
 * API define interface
 */
export interface ApiRouteDefine {
    method: string;
    path: string;
    permission?: AnyType;
}

/**
 * API route decorator
 * @param apiDefine 
 * @returns 
 */
export function ApiRoute(apiDefine: ApiRouteDefine) {
    return function (target: AnyType, propertyKey: string, descriptor: PropertyDescriptor) {
        Reflect.defineMetadata(
            ApiCustomDecoratorName.ApiRoute,
            JSON.stringify(apiDefine),
            target,
            propertyKey
        );
    };
}

