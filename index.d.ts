export default class Obj {
    /**
     * Get an item from an object using "dot" notation.
     *
     * @param obj
     * @param key
     * @param defaults
     * @returns {null|*}
     */
    static get(obj: object | undefined, key: string | null, defaults?: any): any

    /**
     * Set an object item to a given value using "dot" notation.
     *
     * If no key is given to the method, the entire object will be replaced.
     * @param obj
     * @param key
     * @param value
     */
    static set(obj: object, key: string | null, value: any): void
}
