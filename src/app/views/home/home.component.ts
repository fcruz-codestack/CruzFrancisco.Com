import { Component, OnInit } from '@angular/core';
import { UtilService } from '../../_shared/services/util.service';
import { DialogData } from '../../_shared/models/util';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private util: UtilService) { }

  ngOnInit() {
  }

  showDialog() {
    const data = {
      title: 'test',
      body: 'codestack test',
      cancelButton: 'No',
      confirmButton: 'Yes',
      disableClose: false
    } as DialogData;

    // oprional callback: when "Yes" is clicked, do something
    this.util.openDialog(data, (e: any) => {
      console.log('yes was clicked');
      console.log(e);
    });
  }
}
