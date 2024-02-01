export class EntityNotFoundException extends Error{
  public readonly is_business = true;
  public readonly code = 404;

  constructor(entity: string){
    super(`Entity ${entity} not found.`)
  }
}