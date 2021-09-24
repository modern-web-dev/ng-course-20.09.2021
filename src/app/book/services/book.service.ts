import {Book} from '../model/book';
import {BehaviorSubject, Observable} from 'rxjs';

export class BookService {
  private booksSubject = new BehaviorSubject<Book[]>([
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

  update(bookToUpdate: Book): Observable<Book> {
    return new Observable<Book>(subscriber => {
      const bookCopy: Book = {...bookToUpdate};
      const currentBooks = this.booksSubject.getValue();
      const newBooks = currentBooks.map(book => bookToUpdate.id === book.id ? bookCopy : book);
      this.booksSubject.next(newBooks);
      subscriber.next(bookCopy);
      subscriber.complete();
    });
  }

  findAll(): Observable<Book[]> {
    return this.booksSubject.asObservable();
  }

  getOne(bookId: number): Observable<Book> {
    return new Observable(subscriber => {
      const currentBooks = this.booksSubject.getValue();
      const foundBook = currentBooks.find(book => book.id === bookId);
      if (foundBook) {
        subscriber.next(foundBook);
        subscriber.complete();
      } else {
        subscriber.error(`Book with ID: ${bookId} could not be found!`);
      }
    });
  }
}
