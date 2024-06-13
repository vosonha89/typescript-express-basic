/**
 * PostRequest type
 * @typedef {object} PostRequest
 * @property {string} name.required - The name
 */
export class PostRequest {
    public name!: string;
}

/**
 * PutRequest type
 * @typedef {object} PutRequest
 * @property {string} name.required - The name
 */
export class PutRequest {
    public name!: string;
}