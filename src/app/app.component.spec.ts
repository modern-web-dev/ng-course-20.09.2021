import {TestBed} from '@angular/core/testing';
import {AppComponent} from './app.component';
import {BookModule} from './book/book.module';
import {BookService} from './book/services/book.service';
import {Observable, of} from 'rxjs';
import {Book} from './book/model/book';
import HtmlReporter = jasmine.HtmlReporter;

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        AppComponent
      ],
      imports: [
        BookModule.forRoot()
      ],
      providers: [{
        provide: BookService, useValue: {
          findAll(): Observable<Book[]> {
            return of([{id: 1, title: 'Funny book', author: 'Little John'}]);
          }
        }
      }]
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('renders a test book', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const appElement = fixture.nativeElement as HTMLElement;
    const rowElement = appElement.querySelector<HTMLTableRowElement>('table > tbody > tr');
    const cells = rowElement?.querySelectorAll<HTMLTableElement>('td');
    expect(cells?.length).toBe(2);
    const authorCell: HTMLTableElement | undefined = cells?.item(0);
    expect(authorCell?.textContent).toBe('Little John');
  })
});
