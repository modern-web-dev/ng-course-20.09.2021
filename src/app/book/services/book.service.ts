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
  // valueChanges = this.booksSubject.asObservable();

  update(bookToUpdate: Book): Observable<Book> {
    return new Observable<Book>(subscriber => {
      const bookCopy: Book = {...bookToUpdate};
      const currentBooks = this.booksSubject.getValue();
      const newBooks =  currentBooks.map(book => bookToUpdate.id === book.id ? bookCopy : book);
      this.booksSubject.next(newBooks);
      subscriber.next(bookCopy);
      subscriber.complete();
    });
  }

  findAll(): Observable<Book[]> {
    return this.booksSubject.asObservable();
  }
}
