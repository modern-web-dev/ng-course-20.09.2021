import {Book} from '../model/book';
import {Observable, of} from 'rxjs';

export class BookService {
  search(query: string): Observable<string[]> {
    return new Observable<string[]>(subscriber => {
      setTimeout(() => {
        subscriber.next([query, `${query}_1`, `${query}_2`]);
        subscriber.complete();
      }, 2000);
    })
  }

  findAll(): Observable<Book[]> {
    return of([
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


    // return new Observable<Book[]>(subscriber => {
    //   // setTimeout(() => {
    //     subscriber.next([
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
    //     subscriber.complete();
      // }, 2000)
    // });


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
