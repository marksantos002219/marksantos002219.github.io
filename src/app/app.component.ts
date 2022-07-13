import { Component, OnInit } from '@angular/core';
import { Html5Qrcode, Html5QrcodeScanner, Html5QrcodeSupportedFormats } from 'html5-qrcode';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  title = 'scanner';

  ngOnInit(): void {
  }

  async scanFirst(): Promise<void> {
    const cameras = await Html5Qrcode.getCameras();
    if (!cameras.length) {
      return alert('Camera is required.')
    }
    const scanner = new Html5Qrcode('scanner');
    const success = (decodedText: any, decodedResult: any) => {
      console.log(decodedText, decodedResult);
    }
    const error = (err: any) => {
      console.log(err);
    }
    scanner.start(cameras[0].id, {
      fps: 10,
      qrbox: {
        width: 250,
        height: 250
      }
    }, success, error);
  }

  scanSecond(): void {
    const formatsToSupport: Html5QrcodeSupportedFormats[] = [
      Html5QrcodeSupportedFormats.QR_CODE,
      Html5QrcodeSupportedFormats.AZTEC,
      Html5QrcodeSupportedFormats.CODABAR,
      Html5QrcodeSupportedFormats.CODE_39,
      Html5QrcodeSupportedFormats.CODE_93,
      Html5QrcodeSupportedFormats.CODE_128,
      Html5QrcodeSupportedFormats.DATA_MATRIX,
      Html5QrcodeSupportedFormats.MAXICODE,
      Html5QrcodeSupportedFormats.ITF,
      Html5QrcodeSupportedFormats.EAN_13,
      Html5QrcodeSupportedFormats.EAN_8,
      Html5QrcodeSupportedFormats.PDF_417,
      Html5QrcodeSupportedFormats.RSS_14,
      Html5QrcodeSupportedFormats.RSS_EXPANDED,
      Html5QrcodeSupportedFormats.UPC_A,
      Html5QrcodeSupportedFormats.UPC_E,
      Html5QrcodeSupportedFormats.UPC_EAN_EXTENSION,
    ];
    const scanner = new Html5QrcodeScanner(
      'scanner',
      {
        fps: 10,
        qrbox: {
          height: 250,
          width: 250,
        },
        formatsToSupport: formatsToSupport,
        supportedScanTypes: [],
        disableFlip: false,
        videoConstraints: { facingMode: 'environment' },
      },
      false,
    );
    const success = (result: any) => {
      console.log(result);
    };
    const error = (err: any) => {
      console.log(err);
    };
    scanner.render(success, error);
  }
}
