/**
 * PostResponse type
 * @typedef {object} PostResponse
 * @property {string} id.required - The id of object
 * @property {string} name.required - The name of object
 */
export class PostResponse {
    public id!: string;
    public name!: string;
}

/**
 * PutResponse type
 * @typedef {object} PutResponse
 * @property {string} id.required - The id of object
 * @property {string} name.required - The name of object
 */
export class PutResponse {
    public id!: string;
    public name!: string;
}