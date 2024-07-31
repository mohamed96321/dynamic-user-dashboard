import { CustomDirective } from './custom-directive.directive';
import { ElementRef, Renderer2 } from '@angular/core';

describe('CustomDirective', () => {
  let directive: CustomDirective;
  let elementRefMock: any;
  let rendererMock: any;

  beforeEach(() => {
    elementRefMock = { nativeElement: document.createElement('div') };
    rendererMock = jasmine.createSpyObj('Renderer2', ['setStyle', 'removeStyle']);
    directive = new CustomDirective(elementRefMock, rendererMock);
  });

  it('should change background color on mouse enter', () => {
    directive.onMouseEnter();
    expect(rendererMock.setStyle).toHaveBeenCalledWith(elementRefMock.nativeElement, 'background-color', 'lightgray');
  });

  it('should remove background color on mouse leave', () => {
    directive.onMouseLeave();
    expect(rendererMock.removeStyle).toHaveBeenCalledWith(elementRefMock.nativeElement, 'background-color');
  });
});
