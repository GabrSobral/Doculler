import { Sign } from "crypto";


export interface JsonWebTokenAdapter<T> {
  sign: (payload: T, expiresInSeconds: number ) => string;
}