import { Directive, HostListener, Input, ElementRef } from '@angular/core';

@Directive({
  selector: '[onlyDigit]'
})
export class OnlyDigitDirective {
  private readonly DECIMAL_PLACE: { TWO: RegExp } = { TWO: new RegExp(/^\-?(0|[1-9]\d*)+(\.[0-9]{0,2}){0,1}$/g) };
  private readonly STRING_NUMBER = new RegExp(/^\d*$/g);
  private readonly NUMBER = new RegExp(/^\-?(0|[1-9]\d*)$/g);
  private readonly PHONE_NUMBER = new RegExp(/^\+?(\d{0,15})$/g);
  private readonly DECIMAL_SEPARATOR: string = '.';
  private readonly MINUS_SIGN: string = '-';
  private readonly allowedKeys = ['Backspace', 'ArrowLeft', 'ArrowRight', 'Escape', 'Tab'];
  @Input('onlyDigit') value: { allowDecimal?: boolean, allowSign?: boolean, decimalPlace?: number, allowPrefixZero?: boolean, isPhoneNumber?: boolean };
  // @Input() onlyDigit: string;//same as above

  constructor(
    private hostElement: ElementRef
  ) { }

  private getName(e: any): string {
    if (e.key) {
      return e.key;
    } else {
      // for old browsers
      if (e.keyCode && String.fromCharCode) {
        switch (e.keyCode) {
          case 8: return 'Backspace';
          case 9: return 'Tab';
          case 27: return 'Escape';
          case 37: return 'ArrowLeft';
          case 39: return 'ArrowRight';
          case 188: return ',';
          case 190: return this.DECIMAL_SEPARATOR;
          case 109: return this.MINUS_SIGN; // minus in numbpad
          case 173: return this.MINUS_SIGN; // minus in alphabet keyboard in firefox
          case 189: return this.MINUS_SIGN; // minus in alphabet keyboard in chrome
          default: return String.fromCharCode(e.keyCode);
        }
      }
    }
  }

  private isNotValid(value: string) {
    let selectedRegex: RegExp;

    if (this.value.isPhoneNumber) selectedRegex = this.PHONE_NUMBER;
    else if (this.value.allowPrefixZero) selectedRegex = this.STRING_NUMBER;
    else if (this.value.allowDecimal && (!this.value.decimalPlace || this.value.decimalPlace == 2)) selectedRegex = this.DECIMAL_PLACE.TWO;
    else selectedRegex = this.NUMBER;

    return !String(value).match(selectedRegex);
  }

  private validate(value: string, e: Event, key?: string) {
    if ((!this.value.allowSign && value.indexOf(this.MINUS_SIGN) >= 0) || (!this.value.allowDecimal && value.indexOf(this.DECIMAL_SEPARATOR) >= 0)) {
      e.preventDefault();
      return;
    }
    
    let requiredUpdateValue = false;
    if (value.indexOf('.') == 0) {
      if (value.indexOf('.-') == 0) {
        e.preventDefault();
        return;
      } else {
        value = `0${value}`;
        if (key === this.DECIMAL_SEPARATOR) value = value.replace('.', '');
        requiredUpdateValue = true;
      }
    } else if (value.indexOf('-.') == 0) {
      value = `${value.slice(0, 1)}0${value.slice(1)}`;
      if (key === this.DECIMAL_SEPARATOR) value = value.replace('.', '');
      requiredUpdateValue = true;
    }

    if (this.isNotValid(value)) {
      e.preventDefault();
      return;
    }

    if (requiredUpdateValue) {
      this.hostElement.nativeElement['value'] = value;
    }
  }

  @HostListener('keydown', ['$event'])
  onKeyDown(e: KeyboardEvent) {
    let cursorPosition: number = e.target['selectionStart'];
    let originalValue: string = e.target['value'];
    let key = this.getName(e);
    let controlOrCommand = (e.ctrlKey === true || e.metaKey === true);

    if (this.value.allowDecimal) {
      if (originalValue.includes(this.DECIMAL_SEPARATOR) && key === this.DECIMAL_SEPARATOR) {
        e.preventDefault();
        return;
      }
    } else if (key === this.DECIMAL_SEPARATOR) {
      e.preventDefault();
      return;
    }

    if (this.value.allowSign) {
      if (originalValue.includes(this.MINUS_SIGN) && key === this.MINUS_SIGN) {
        e.preventDefault();
        return;
      }
    } else if (key === this.MINUS_SIGN) {
      e.preventDefault();
      return;
    }

    if (this.allowedKeys.indexOf(key) != -1 || controlOrCommand) {
      return;
    }

    let newString: string;

    if (cursorPosition != originalValue.length) {
      newString = `${originalValue.slice(0, cursorPosition)}${key}${originalValue.slice(cursorPosition)}`;
    } else {
      newString = `${originalValue}${key}`;
    }

    this.validate(newString, e, key);
  }

  @HostListener('paste', ['$event']) onPaste(e: ClipboardEvent) {
    let value = e.clipboardData.getData('text/plain');
    this.validate(value, e);
  }
}