import {Component, Input, Output, EventEmitter} from '@angular/core';
import {Book} from '../../model/book';

@Component({
  selector: 'ba-book-details',
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.scss'],

})
export class BookDetailsComponent {
  @Input("value")
  book: Book | undefined;

  @Output("valueUpdate")
  bookUpdate = new EventEmitter<Book>();

  notifyOnBookChange(event: Event) {
    event.preventDefault();
    const form = event.target as HTMLFormElement;
    const authorElement = form.querySelector<HTMLInputElement>('#author');
    const author = authorElement?.value || '';
    const titleElement = form.querySelector<HTMLInputElement>('#title');
    const title = titleElement?.value || '';
    const updatedBook: Book = {id: this.book?.id, author, title};

    this.bookUpdate.emit(updatedBook);
  }
}
