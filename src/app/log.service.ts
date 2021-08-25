import { Injectable } from '@angular/core';

@Injectable({
   providedIn: 'root',
})
export class LogService {
  constructor() {}

  writeLog(log :string) {
    console.log(log);
  }
}
