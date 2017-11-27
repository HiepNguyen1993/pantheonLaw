export interface Serializable<T>{
    serialize(input: any): T;
}
