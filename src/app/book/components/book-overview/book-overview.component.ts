import {AfterViewInit, Component, ElementRef, ViewChild} from '@angular/core';
import {Book} from '../../model/book';
import {BookService} from '../../services/book.service';
import {fromEvent, Observable, OperatorFunction} from 'rxjs';
import {debounceTime, distinctUntilChanged, map, switchMap} from 'rxjs/operators';

@Component({
  selector: 'ba-book-overview',
  templateUrl: './book-overview.component.html',
  styleUrls: ['./book-overview.component.scss']
})
export class BookOverviewComponent implements AfterViewInit {
  // books: Book[] = [];
  books$: Observable<Book[]>;
  matches$: Observable<string[]> | undefined;
  selectedBook: Book | null;
  @ViewChild('typeahead')
  typeaheadElement: ElementRef<HTMLInputElement> | undefined;
  private handle: number | null = null;

  constructor(private books: BookService) {
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
    // this.books = this.books.map(book => updatedBook.id === book.id ? updatedBook : book);
    this.selectedBook = updatedBook;
  }

  ngAfterViewInit(): void {
    const typeaheadElement = this.typeaheadElement?.nativeElement;
    if (typeaheadElement) {
      this.matches$ = fromEvent(typeaheadElement, 'input')
        .pipe(
          debounceTime(500),
          mapEventToTargetValue(),
          // map(event => (event.target as HTMLInputElement).value),
          distinctUntilChanged(),
          switchMap(query => this.books.search(query))
        );
    }
  }
}

function mapEventToTargetValue(): OperatorFunction<Event, string> {
  return map(event => (event.target as HTMLInputElement).value);
}
