import {ChangeDetectionStrategy, Component, EventEmitter, Input, Output} from '@angular/core';
import {Book} from '../../model/book';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'ba-book-details',
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BookDetailsComponent {
  book: Book;

  constructor(currentRoute: ActivatedRoute) {
    this.book = currentRoute.snapshot.data.book;
  }

  notifyOnBookChange(event: Event) {
    event.preventDefault();
    const form = event.target as HTMLFormElement;
    const authorElement = form.querySelector<HTMLInputElement>('#author');
    const author = authorElement?.value || '';
    const titleElement = form.querySelector<HTMLInputElement>('#title');
    const title = titleElement?.value || '';
    const updatedBook: Book = {id: this.book?.id, author, title};
  }
}
