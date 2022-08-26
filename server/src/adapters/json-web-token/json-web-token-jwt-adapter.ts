import 'dotenv/config';
import jwt from 'jsonwebtoken';

import { JsonWebTokenAdapter } from "../json-web-token-adapter";

interface JWTPayload {
  email: string;
}

export class JsonWebToken implements JsonWebTokenAdapter<JWTPayload> {
  private _secret;

  constructor() {
    this._secret = process.env.JWT_SECRET;
  }

  sign(payload: JWTPayload, expiresInSeconds: number) {      
    const token = jwt.sign(
      payload, 
      this._secret!,
      { expiresIn: expiresInSeconds }
    );

    return token;
  };
}