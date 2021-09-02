import { singleton } from 'aurelia-dependency-injection';
import { User } from './user';

@singleton()
export class DataService {

  private counter: number = 0;

  public async getUsers(): Promise<User[]> {

    const data = [
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

    return this.createPromise(data);
  }

  private createPromise(data: any, timeout: number = 100): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      setTimeout(() => {
        try {
          resolve(data);
        } catch (error: unknown) {
          reject(error);
        }
      }, timeout);
    });
  }
}