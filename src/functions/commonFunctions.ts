import { Request } from "express";
import crypto from "crypto";

export class CommonFunctions {
    /**
     * Get search params from request
     * @param req 
     * @returns 
     */
    public static getSearchParamsFromRequest(req: Request): { [key: string]: string } {
        const URLObject = new URL("https://exmaple.com" + req.url);
        const params = new URLSearchParams(URLObject.search);
        const searchQuery: { [key: string]: string } = {};
        for (const [key, value] of params) {
            if (!["limit", "timeJoinedOrder", "paginationToken"].includes(key)) {
                searchQuery[key] = value;
            }
        }
        return searchQuery;
    }

    /**
     * Create uuidv4
     * @returns 
     */
    public static uuidv4(): string {
        return "10000000-1000-4000-8000-100000000000".replace(/[018]/g, c =>
            (+c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> +c / 4).toString(16)
        );
    }

    /**
     * Remove duplicate
     * @param source 
     * @returns 
     */
    public static removeDuplicate<T>(source: Array<T>): Array<T> {
        return source.filter((value, index, array) =>
            array.indexOf(value) === index
        );
    }
}