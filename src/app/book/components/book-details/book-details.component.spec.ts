import {BookDetailsComponent} from './book-details.component';
import {Book} from '../../model/book';
import {ComponentFixture, TestBed} from '@angular/core/testing';

describe('BookDetailsComponent', () => {
  const testId = 1;
  const testAuthor = 'Test Author';
  const testTitle = 'Test Title';
  const updatedAuthor = 'Updated Author';
  const updatedTitle = 'Updated Title';
  let testBook: Book;

  beforeEach(() => {
    testBook = {id: testId, author: testAuthor, title: testTitle}
  });

  describe('(class tests)', () => {
    it('notifies on book changes', () => {
      // 1. given
      const eventStub: any = {
        preventDefault: jasmine.createSpy(),
        target: {
          querySelector(selector: string) {
            return {
              value: selector === '#author' ? updatedAuthor : updatedTitle
            };
          }
        }
      };
      const component = new BookDetailsComponent();
      component.book = testBook;
      component.bookUpdate.subscribe(updatedBook => {
        // 3. then
        expect(eventStub.preventDefault).toHaveBeenCalled();
        expect(updatedBook.id).toBe(testBook.id);
        expect(updatedBook.author).toBe(updatedAuthor);
        expect(updatedBook.title).toBe(updatedTitle);
      });
      // 2. when
      component.notifyOnBookChange(eventStub);
    });
  });

  describe('(DOM tests)', () => {
    let fixture: ComponentFixture<BookDetailsComponent>, component: BookDetailsComponent, element: HTMLElement;

    beforeEach(() => {
      return TestBed.configureTestingModule({
        declarations: [BookDetailsComponent]
      }).compileComponents();
    })

    beforeEach(() => {
      fixture = TestBed.createComponent(BookDetailsComponent);
      component = fixture.componentInstance;
      element = fixture.nativeElement as HTMLElement;
    });

    it('shows author and title in inputs', () => {
      // when
      component.book = testBook;
      fixture.detectChanges();
      // then
      expect(getAuthorInput()?.value).toBe(testAuthor);
      expect(getTitleInput()?.value).toBe(testTitle);
    });

    it('notifies on book changes when save clicked', () => {
      // 1. given
      component.book = testBook;
      fixture.detectChanges();
      const authorInput = getAuthorInput();
      if (authorInput) {
        authorInput.value = updatedAuthor;
      }
      const titleInput = getTitleInput();
      if (titleInput) {
        titleInput.value = updatedTitle;
      }
      component.bookUpdate.subscribe(updatedBook => {
        // 3. then
        expect(updatedBook.id).toBe(testBook.id);
        expect(updatedBook.author).toBe(updatedAuthor);
        expect(updatedBook.title).toBe(updatedTitle);
      });
      // 2. when
      const saveButton = element.querySelector<HTMLButtonElement>('button');
      saveButton?.click();
    });

    function getAuthorInput(): HTMLInputElement | null {
      if (element) {
        return element.querySelector<HTMLInputElement>('#author')
      }
      return null;
    }

    function getTitleInput(): HTMLInputElement | null {
      if (element) {
        return element.querySelector<HTMLInputElement>('#title')
      }
      return null;
    }
  });
});
