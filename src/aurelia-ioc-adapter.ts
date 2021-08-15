import { Container } from 'aurelia-dependency-injection';
import { Action, IocAdapter } from 'routing-controllers';

export class AureliaIocAdapter implements IocAdapter {
  
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  // eslint-disable-next-line no-unused-vars
  public get<T>(someClass: any, action?: Action): T {
    return Container.instance.get(someClass); 
  }
}