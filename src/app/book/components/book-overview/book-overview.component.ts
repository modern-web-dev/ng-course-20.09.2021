import {Component} from '@angular/core';
import {Book} from '../../model/book';

@Component({
  selector: 'ba-book-overview',
  templateUrl: './book-overview.component.html',
  styleUrls: ['./book-overview.component.scss']
})
export class BookOverviewComponent {
  books: Book[];
  selectedBook: Book | null;

  constructor() {
    this.selectedBook = null;
    this.books = [
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

  selectBook(book: Book): void {
    this.selectedBook = book;
  }

  isBookSelected(book: Book): boolean {
    return this.selectedBook === book;
  }

  updateBooksOn(updatedBook: Book) {
    this.books = this.books.map(book => updatedBook.id === book.id ? updatedBook : book);
    this.selectedBook = updatedBook;
  }
}
