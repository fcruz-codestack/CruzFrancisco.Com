import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material';
import { CustomDialogComponent } from '../components/custom-dialog/custom-dialog.component';
import { DialogData } from '../models/util';

@Injectable({
  providedIn: 'root'
})
export class UtilService {

  constructor(public dialog: MatDialog) { }

  openDialog(settings: DialogData, callback: (q: any) => void) {
    const dialogRef = this.dialog.open(CustomDialogComponent, {
      data: {
        title: this.defaultVal(settings.title, ''),
        body: this.defaultVal(settings.body, ''),
        confirmButton: this.defaultVal(settings.confirmButton, ''),
        cancelButton: this.defaultVal(settings.cancelButton, ''),
      },
      disableClose: this.defaultVal(settings.disableClose, false),
      minWidth: '300px',
      minHeight: '100px'
    });
    dialogRef.componentInstance.onConfirm.subscribe((e: any) => {
      callback(e);
    });
    dialogRef.afterClosed().subscribe(result => {
      // unsubscribe onConfirm
      console.log(result);
      console.log('unsubscribed');
    });
  }

  defaultVal(val: any, set: any) {
    if (this.isEmpty(val)) {
      return set;
    }
    return val;
  }

  isEmpty(str: any): boolean {
    return this.isNull(str) || String(str).replace(/\s/g, '') === '';
  }

  isNull(obj: any, properties?: string): boolean {
    if (properties === undefined || properties === null || this.isNull(obj)) {
      return obj === undefined || obj === null;
    }
    const split: string[] = properties.split('.');
    // tslint:disable-next-line: prefer-for-of
    for (let i = 0; i < split.length; i++) {
      obj = obj[split[i]];
      if (obj === undefined || obj === null) {
        return true;
      }
    }
    return false;
  }

  isNumeric(str: any): boolean {
    if (this.isEmpty(str)) {
      return false;
    }
    return !isNaN(str - parseFloat(str));
    // From jQuery (https://github.com/jquery/jquery/blob/25d8ccd1112d75394b91071ff7eba13283aaf898/src/core.js#L223)
  }

  startsWith(str: string, search: string): boolean {
    if (this.isEmpty(str) || this.isEmpty(search)) {
      return false;
    }
    if (search.length > str.length) {
      return false;
    }
    return str.toLowerCase().substring(0, search.length) === search.toLowerCase();
  }

  cleanSearch(keywords: string): string {
    if (this.isEmpty(keywords)) {
      return '';
    }
    let cleanedKeywords = '';
    // remove any double spaces
    keywords = keywords.replace(/\s{2,}/g, ' ');
    let words = new Array();
    words = keywords.split(' ');
    for (const str of words) {
      // remove any special characters;
      const word = str.replace(/[^\w\s]/gi, '');
      cleanedKeywords += word + ' ';
    }
    return cleanedKeywords.toString().trim();
  }

  // Converts date + time strings to a Date object.
  // Date and time parameters should have already
  // been validated with DATE_REGEX and TIME_REGEX.
  stringsToDate(dateStr: string, timeStr: string) {
    // mm/dd/yyyy, m/d/yyyy
    // https://regex101.com/r/7iSsmm/2
    const DATE_REGEX = new RegExp(/^(\d{2}|\d)\/(\d{2}|\d)\/\d{4}$/);
    // h:mm am/pm, hh:mm AM/PM
    // https://regex101.com/r/j2Cfqd/1/
    const TIME_REGEX = new RegExp(/^((1[0-2]|0?[1-9]):([0-5][0-9]) ([AaPp][Mm]))$/);

    if (!DATE_REGEX.test(dateStr) || !TIME_REGEX.test(timeStr)) {
      console.error('Cannot convert date/time to Date object.');
      return null;
    }
    const date = new Date(dateStr);
    const timeArr = timeStr.split(/[\s:]+/); // https://regex101.com/r/H4dMvA/1
    let hour = parseInt(timeArr[0], 10);
    const min = parseInt(timeArr[1], 10);
    const pm = timeArr[2].toLowerCase() === 'pm';

    if (!pm && hour === 12) {
      hour = 0;
    }
    if (pm && hour < 12) {
      hour += 12;
    }
    date.setHours(hour);
    date.setMinutes(min);
    return date;
  }
}
