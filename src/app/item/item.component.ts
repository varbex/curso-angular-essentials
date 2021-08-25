import { Component, Input, OnInit, Output } from '@angular/core';
import { StarWarsService } from '../star-wars.service';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css'],
})
export class ItemComponent implements OnInit {
  @Input() character;
  starwarsService: StarWarsService;

  constructor(starwarsService: StarWarsService) {
    this.starwarsService = starwarsService;
  }
  ngOnInit(): void {}

  onAssignSide(side) {
    //this.character.side = side;
    //this.sideAssigned.emit({ name: this.character.name, side: side });
    this.starwarsService.onSideChosen({ name: this.character.name, side: side });
  }
}
