import { AnyType } from '../types/baseType';

export class ReflectFunctions {
    /**
     * Get info about class or property attributes.
     * @param metadataKeyPart Start of the metadata key that was assigned to a annotation.
     * @param target Class `type` to get class decorators. `instance` to get property decorators.
     * @param propertyName Name of property for which decorators will be retrieved.
     * @returns 
     */
    public static getDecorators(metadataKeyPart: string, target: AnyType, propertyName?: string | symbol): string[] {
        const keys: AnyType[] = propertyName
            ? Reflect.getMetadataKeys(target, propertyName)
            : Reflect.getMetadataKeys(target);

        const decorators = keys
            .filter(key => key.toString().startsWith(metadataKeyPart))
            .reduce((values, key) => {
                const currentDecorators = propertyName
                    ? Reflect.getMetadata(key, target, propertyName)
                    : Reflect.getMetadata(key, target);

                return values.concat(currentDecorators);
            }, []);

        return decorators;
    }
}