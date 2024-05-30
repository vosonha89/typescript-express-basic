import 'reflect-metadata';
import { container } from 'tsyringe';
import { Request, Response } from "express";
import { ApiController } from 'typescript-express-basic/lib/types/baseApiController';
import { ApiRoute } from 'typescript-express-basic/lib/functions/apiDecorators';
import { ApiMethod } from 'typescript-express-basic/lib/constants/apiMethod';
import { StatusCode } from 'typescript-express-basic/lib/constants/statusCode';
import { AnyType } from 'typescript-express-basic/lib/types/baseType';

export class PublicController extends ApiController {
    public controllerName = 'public';

    @ApiRoute({
        method: ApiMethod.GET,
        path: '/get'
    })
    public get(req: Request, res: Response): void {
        const id = req.query.id;
        res.status(StatusCode.Ok);
        res.send('Public get ' + id);
    }

    @ApiRoute({
        method: ApiMethod.POST,
        path: '/post'
    })
    public post(req: Request, res: Response): void {
        const data = {} as AnyType;
        data.name = req.body.name;
        res.status(StatusCode.Ok);
        res.send(data);
    }
    

    @ApiRoute({
        method: ApiMethod.PUT,
        path: '/put'
    })
    public put(req: Request, res: Response): void {
        const data = {} as AnyType;
        data.name = req.body.name;
        res.status(StatusCode.Ok);
        res.send(data);
    }

    @ApiRoute({
        method: ApiMethod.DELETE,
        path: '/delete'
    })
    public delete(req: Request, res: Response): void {
        const data = {} as AnyType;
        data.name = req.body.name;
        res.status(StatusCode.Ok);
        res.send(data);
    }
}