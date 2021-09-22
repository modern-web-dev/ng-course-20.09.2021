import {Component, OnDestroy} from '@angular/core';
import {Book} from '../../model/book';
import {BookService} from '../../services/book.service';
import {Observable, Subscription} from 'rxjs';
import {filter, map} from 'rxjs/operators';

@Component({
  selector: 'ba-book-overview',
  templateUrl: './book-overview.component.html',
  styleUrls: ['./book-overview.component.scss']
})
export class BookOverviewComponent {
  books: Book[] = [];
  books$: Observable<Book[]>;
  selectedBook: Book | null;

  constructor(books: BookService) {
    this.selectedBook = null;
    this.books$ = books.findAll();
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
