import {Component, OnDestroy} from '@angular/core';
import {Book, BookProps} from '../../model/book';
import {ActivatedRoute, Router} from '@angular/router';
import {BookService} from '../../services/book.service';
import {Observable, Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';

@Component({
  selector: 'ba-book-details',
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.scss']
})
export class BookDetailsComponent implements OnDestroy {
  book: Book | undefined;
  private unsubscribe = new Subject();

  constructor(private books: BookService,
              private router: Router,
              private currentRoute: ActivatedRoute) {
    this.book = currentRoute.snapshot.data.book;
  }

  saveAndGoToOverview(event: Event) {
    event.preventDefault();
    const form = event.target as HTMLFormElement;
    const authorElement = form.querySelector<HTMLInputElement>('#author');
    const author = authorElement?.value || '';
    const titleElement = form.querySelector<HTMLInputElement>('#title');
    const title = titleElement?.value || '';

    let saveOrUpdate: Observable<Book>;
    if (this.book) { // edit existing book
      const bookToUpdate: Book = {id: this.book.id, author, title};
      saveOrUpdate = this.books.update(bookToUpdate);
    } else { // new book
      const bookToSave: BookProps = {author, title};
      saveOrUpdate = this.books.save(bookToSave)
    }

    saveOrUpdate.pipe(takeUntil(this.unsubscribe)).subscribe(
      () => this.router.navigate(['..'], {relativeTo: this.currentRoute}))
  }

  ngOnDestroy(): void {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }
}
