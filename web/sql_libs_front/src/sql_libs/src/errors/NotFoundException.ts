export class NotFoundException extends Error {
  constructor(message?: string, options?: ErrorOptions) {
    super(message, options);
    this.name = 'NotFoundException';
  }
}
