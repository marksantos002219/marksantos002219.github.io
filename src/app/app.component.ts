import { Component, OnInit } from '@angular/core';
import { Html5Qrcode } from 'html5-qrcode';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  title = 'scanner';

  async ngOnInit(): Promise<void> {
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
}
