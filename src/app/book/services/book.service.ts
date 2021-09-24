import {Book, BookProps} from '../model/book';
import {BehaviorSubject, Observable} from 'rxjs';
import {delay} from 'rxjs/operators';

export class BookService {
  private idSeq = 0;

  private booksSubject = new BehaviorSubject<Book[]>([
    {
      id: this.idSeq++,
      author: 'Douglas Crockford',
      title: 'JavaScript. The Good Parts'
    },
    {
      id: this.idSeq++,
      author: 'Marek Matczak',
      title: 'Angular for nerds'
    },
    {
      id: this.idSeq++,
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

  save(bookToSave: BookProps): Observable<Book> {
    return new Observable<Book>(subscriber => {
      const newBook = {id: this.idSeq++, ...bookToSave};
      const currentBooks = this.booksSubject.getValue();
      const newBooks = [...currentBooks, newBook];
      this.booksSubject.next(newBooks);
      subscriber.next(newBook);
      subscriber.complete();
    })
  }

  findAll(): Observable<Book[]> {
    return this.booksSubject.asObservable();
  }

  getOne(bookId: number): Observable<Book> {
    return new Observable<Book>(subscriber => {
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
