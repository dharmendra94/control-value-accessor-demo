import { SearchResponse, movie } from './models/netflix-search-response';
import { NetflixSearchRequest } from './models/netflix-search-req';
import { NetflixSearchService } from './services/netflix-search.service';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'control-value-accessor-demo';

  netflixSearchRequest: NetflixSearchRequest = {
    start_year: '2019',
    orderby: 'rating',
    audiosubtitle_andor: 'and',
    limit: '100',
    subtitle: 'english',
    countrylist: '337',
    audio: 'english',
    country_andorunique: 'unique',
    offset: '0',
    end_year: '2021',
  };

  netflixSearchResponse: SearchResponse;

  userReviews = new FormGroup({
    userName: new FormControl('', Validators.required),
    movies: new FormArray([]),
  });

  constructor(private netflixSearchService: NetflixSearchService) {}

  ngOnInit(): void {
    this.searchMovies();
  }

  movieName(movie: FormGroup) {
    return movie.get('title').value;
  }

  submitReviews(): void {
    const reviews = this.userReviews.value;
    console.log(reviews);
  }

  private searchMovies() {
    this.netflixSearchService
      .search(this.netflixSearchRequest)
      .subscribe((response) => {
        this.netflixSearchResponse = response;
        this.addMovies(response.results);
      });
  }

  private addMovies(movie: movie[]) {
    movie.map((m) => {
      this.movies.push(
        new FormGroup({
          id: new FormControl(m.id),
          title: new FormControl(
            { value: m.title, disabled: true },
            Validators.required
          ),
          rating: new FormControl(),
        })
      );
    });
  }

  get movies(): FormArray {
    return this.userReviews.get('movies') as FormArray;
  }
}
