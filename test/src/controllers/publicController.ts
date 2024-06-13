import 'reflect-metadata';
import { container } from 'tsyringe';
import { Request, Response } from "express";
import { AnyType, ApiController, ApiMethod, ApiRoute, CommonFunctions, StatusCode } from 'typescript-express-basic';
import { PostRequest, PutRequest } from '../objects/request/publicRequest';
import { PostResponse, PutResponse } from '../objects/response/publicResponse';

export class PublicController extends ApiController {
    public controllerName = 'public';

    /**
     * GET /public/get
     * @summary This is the summary of the public get
     * @tags Public
     * @param {string} id.query.required - id param description
     * @return {string} 200 - success response - application/json
     * @return {object} 400 - Bad request response
     */
    @ApiRoute({
        method: ApiMethod.GET,
        path: '/get'
    })
    public get(req: Request, res: Response): void {
        const id = req.query.id;
        res.status(StatusCode.Ok);
        res.send('Public get ' + id);
    }

    /**
     * POST /public/post
     * @summary This is the summary of the public post
     * @tags Public
     * @param {PostRequest} request.body.required - post request info
     * @return {PostResponse} 200 - success response - application/json
     * @return {object} 400 - Bad request response
     */
    @ApiRoute({
        method: ApiMethod.POST,
        path: '/post'
    })
    public post(req: Request, res: Response): void {
        const request = {
            name: req.body.name
        } as PostRequest;
        const data = new PostResponse();
        data.id = CommonFunctions.uuidv4();
        data.name = request.name;
        res.status(StatusCode.Ok);
        res.send(data);
    }

    /**
     * PUT /public/put
     * @summary This is the summary of the public put
     * @tags Public
     * @param {string} id.query.required - put request id
     * @param {PutRequest} request.body.required - put request info
     * @return {PutResponse} 200 - success response - application/json
     * @return {object} 400 - Bad request response
     */
    @ApiRoute({
        method: ApiMethod.PUT,
        path: '/put'
    })
    public put(req: Request, res: Response): void {
        const id = req.query.id as string;
        const request = {
            name: req.body.name
        } as PutRequest;
        const data = new PutResponse();
        data.id = id;
        data.name = request.name;
        res.status(StatusCode.Ok);
        res.send(data);
    }

    /**
     * DELETE /public/delete
     * @summary This is the summary of the public delete
     * @tags Public
     * @param {string} id.query.required - id param description
     * @return {boolean} 200 - success response - application/json
     * @return {object} 400 - Bad request response
     */
    @ApiRoute({
        method: ApiMethod.DELETE,
        path: '/delete'
    })
    public delete(req: Request, res: Response): void {
        const id = req.query.id;
        res.status(StatusCode.Ok);
        res.send(true);
    }
}