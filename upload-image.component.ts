import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-upload-image',
  templateUrl: './upload-image.component.html',
  styleUrls: ['./upload-image.component.scss']
})
export class UploadImageComponent implements OnInit {
  @Input() inputImage;
  @Output() loadedImageEvent = new EventEmitter<any>();

  loadedImage: any = '';
  loadedImage64: any = '';

  /** Allowed image format */
  allowedImageFormats: String[] = ['image/jpeg', 'image/png', 'image/jpg'];

  constructor() {
  }

  ngOnInit() {
    if (this.inputImage) {
      // Decript image from base64
      this.loadedImage = atob(this.inputImage);
    };
  }

  /** Upload Image */
  handleFileSelect(uploadEvent) {
    const file = uploadEvent.target.files[0];
    if (file && this.__hasCorrectImageFormat(file.type)) {
      const reader = new FileReader();
      reader.onloadend = (e) => {
        // Save image for display preview
        this.loadedImage = reader.result;
        // Crypt image to base64
        this.loadedImage64 = btoa(reader.result);
        /** Emit uploaded image in base64 */
        this.loadedImageEvent.emit(this.loadedImage64);
      };
      reader.readAsDataURL(file);
    } else {
      console.log('wrong format');
    }
  }

  /** Remove loaded image */
  removeLoadedImage() {
    this.loadedImage = '';
    this.loadedImage64 = '';
    this.loadedImageEvent.emit(this.loadedImage64);
  }

  /** Check image format */
  __hasCorrectImageFormat(imageFormat) {
    return (this.allowedImageFormats.indexOf(imageFormat) > -1);
  }
}
