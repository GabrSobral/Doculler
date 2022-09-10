import { InvalidNameError } from "../../../../src/domain/errors/user-errors/invalid-name-error";

import { Either, left, right } from "../../../../src/shared/either";

export class Name {
  private readonly name: string;

  private constructor(name: string) {
    this.name = name;
    Object.freeze(this);
  }

  get value() {
    return this.name;
  }

  static create(name: string): Either<InvalidNameError, Name> {
    if (!this.validate(name))
      return left(new InvalidNameError(name));
    
    return right(new Name(name));
  }

  static validate(name: string): boolean {
    if (!name || name.trim().length < 2 || name.trim().length > 255)
      return false;

    return true;
  }
}