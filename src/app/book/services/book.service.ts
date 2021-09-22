import {Book} from '../model/book';

export class BookService {
  findAll(): Book[] {
    return [
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
    ];
  }
}
