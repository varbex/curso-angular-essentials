import { Component, OnInit } from '@angular/core';
import { StarWarsService } from '../star-wars.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-character',
  templateUrl: './create-character.component.html',
  styleUrls: ['./create-character.component.css'],
})
export class CreateCharacterComponent implements OnInit {
  sides = [
    { display: 'None', value: '' },
    { display: 'Light', value: 'light' },
    { display: 'Dark', value: 'dark' },
  ];
  starwarsService: StarWarsService;
  router: Router;

  constructor(starwarsService: StarWarsService, router: Router) {
    this.starwarsService = starwarsService;
    this.router = router;
  }
  ngOnInit(): void {}

  onSubmit(form) {
    if (form.invalid) {
      return;
    }
    this.starwarsService.addCharacter(form.value.name, form.value.side);
    this.router.navigate(['/characters/all']);
  }
}
