import { Component, forwardRef, OnInit } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';

const STAR_ICON = ` <svg xmlns="http://www.w3.org/2000/svg" enable-background="new 0 0 24 24" height="30px"
viewBox="0 0 24 24" width="30px" fill="#000000" class="star rating"
>
<polygon points="9.9, 1.1, 3.3, 21.78, 19.8, 8.58, 0, 8.58, 16.5, 21.78" style="fill-rule:nonzero;" />
</svg>`;

@Component({
  selector: 'app-rating',
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => RatingComponent),
      multi: true,
    },
  ],
})
export class RatingComponent implements OnInit, ControlValueAccessor {
  public ratings: { stars: number; text: string }[] = [
    {
      stars: 1,
      text: 'Not recommended',
    },
    {
      stars: 2,
      text: 'Can do better',
    },
    {
      stars: 3,
      text: 'One time watch',
    },
    {
      stars: 4,
      text: 'Worth watching',
    },
    {
      stars: 5,
      text: 'Excellent',
    },
  ];

  onChange: any = () => {};
  onTouched: any = () => {};
  value: number;
  disabled: boolean;

  constructor(iconRegistry: MatIconRegistry, sanitizer: DomSanitizer) {
    iconRegistry.addSvgIconLiteral(
      'star',
      sanitizer.bypassSecurityTrustHtml(STAR_ICON)
    );
  }

  writeValue(obj: any): void {
    this.value = obj;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  ngOnInit(): void {}

  setRating(star: { stars: number; text: string }) {
    this.value = star.stars;
    this.onChange(star.stars);
    this.onTouched();
  }
}
