import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import 'rxjs/add/operator/map';
import { Http, Response } from '@angular/http';
import { LogService } from './log.service';

@Injectable({
  providedIn: 'root',
})
export class StarWarsService {
  characters = [
    { name: 'luke Skywalker', side: 'light' },
    { name: 'darth vader', side: 'dark' },
  ];
  logService: LogService;
  http: Http;
  charactersChanged = new Subject<void>();

  constructor(logService: LogService, http: Http) {
    this.logService = logService;
    this.http = http;
  }

  fetchCharacters() {
    this.http
      .get('https://swapi.dev/api/people')
      .map((response: Response) => {
        const data = response.json();
        const extractedChars = data.results;
        const chars = extractedChars.map((ec) => {
          return { name: ec.name, side: ec.side };
        });
        return chars
      })
      .subscribe((chars) => {
        console.log(chars);
        this.characters = chars;
        this.charactersChanged.next();
      });

  }

  getCharacters(choosenList) {
    if (choosenList === 'all') {
      return this.characters.slice();
    }
    return this.characters.filter((c) => c.side === choosenList);
  }

  onSideChosen(charInfo) {
    let index = this.characters.findIndex((c) => c.name === charInfo.name);
    this.characters[index].side = charInfo.side;
    this.charactersChanged.next();
    this.logService.writeLog(
      `Mudei o personagem ${charInfo.name} para o lado ${charInfo.side}`
    );
  }

  addCharacter(name: string, side: string) {
    let index = this.characters.findIndex((c) => c.name === name);
    if (index !== -1) {
      return;
    }
    this.characters.push({ name: name, side: side });
    this.logService.writeLog(`Adicionei o personagem: ${name} lado: ${side}`);
    this.charactersChanged.next();
  }
}
