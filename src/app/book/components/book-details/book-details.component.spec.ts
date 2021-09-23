import {fakeAsync, tick, waitForAsync} from '@angular/core/testing';
import {BookDetailsComponent} from './book-details.component';
import {Book} from '../../model/book';

describe('BookDetailsComponent', () => {
  describe('(class tests)', () => {
    it('notifies on book changes', () => {
      // 1. given
      const updatedAuthor = 'Updated Author';
      const updatedTitle = 'Updated Title';
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
      const testBook: Book = {id: 1, author: 'Test Author', title: 'Test Title'}
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

  describe('(DOM tests)', ()=>{

  });
});
