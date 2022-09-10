import { Sign } from "crypto";


interface JsonWebTokenAdapter<T> {
  sign: (payload: T, expiresInSeconds: number ) => string;
}