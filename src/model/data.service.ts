import { singleton } from 'aurelia-dependency-injection';
import { User } from './user';

@singleton()
export class DataService {

  private counter: number = 0;

  public getUsers(): User[] {
    return [
      <User>{
        id: 1,
        name: 'Vasya',
        age: 25,
        counter: ++this.counter
      },
      <User>{
        id: 2,
        name: 'Petya',
        age: 32,
        counter: this.counter
      }
    ];
  }
}