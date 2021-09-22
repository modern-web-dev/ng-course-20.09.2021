import {Book} from '../model/book';
import {Observable} from 'rxjs';

export class BookService {
  findAll(): Observable<Book[]> {
    return new Observable<Book[]>(subscriber => {
      setTimeout(() => {
        subscriber.next([
          {
            id: 0,
            author: 'Douglas Crockford',
            title: 'JavaScript. The Good Parts'
          },
          {
            id: 1,
            author: 'Marek Matczak',
            title: 'Angular for nerds'
          },
          {
            id: 2,
            author: 'Tom Hombergs',
            title: 'Get You Hands Dirty on Hexagonal Architecture'
          }
        ]);
        subscriber.complete();
      }, 2000)
    });


    // return new Promise<Book[]>(resolve => {
    //   setTimeout(()=>{
    //     resolve([
    //       {
    //         id: 0,
    //         author: 'Douglas Crockford',
    //         title: 'JavaScript. The Good Parts'
    //       },
    //       {
    //         id: 1,
    //         author: 'Marek Matczak',
    //         title: 'Angular for nerds'
    //       },
    //       {
    //         id: 2,
    //         author: 'Tom Hombergs',
    //         title: 'Get You Hands Dirty on Hexagonal Architecture'
    //       }
    //     ]);
    //   }, 0);
    // })
  }
}
