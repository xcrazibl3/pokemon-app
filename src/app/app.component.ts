import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common'; // ngIf, ngFor etc.

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'pokemon-app';
  pokemonList: any[] = []; // To hold the list of pokemons

  // Lifecycle hook is called when component has been initialized
  ngOnInit() {
    this.fetchMultiplePokemons(10);
  }

  fetchMultiplePokemons(limit: number) {
    const apiUrl = `https://pokeapi.co/api/v2/pokemon?limit=${limit}?offset=0`;

    // Asyncrhonos HTTP request
    fetch(apiUrl)
      // First fetch pokemons with name and url for more info
      .then((response) => response.json())
      .then((data) => {
        // A map of promises with new pokemon data
        const requests = data.results.map(async (pokemon: any) => {
          return fetch(pokemon.url).then((result) => result.json());
        });

        Promise.all(requests).then((pokemonDetails) => {
          console.log('pokemon details: ', pokemonDetails);

          this.pokemonList = pokemonDetails;
        });
      })
      .catch((error) => console.log('Pokemonlist error: ', error));
  }

  addPokemonByName(name: string) {
    const apiUrl = `https://pokeapi.co/api/v2/pokemon/${name.toLowerCase()}`;

    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {
        /*if (!thisVariable) {
          throw new Error('Something happened')
        }*/
        this.pokemonList.push(data);
      })
      .catch((error) => console.log('Add pokemon to list error :', error));
  }
}
