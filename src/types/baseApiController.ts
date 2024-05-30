import "reflect-metadata";

export abstract class ApiController {
    /**
     * Controller name
     * Example: "api"
     */
    public abstract controllerName: string;
}