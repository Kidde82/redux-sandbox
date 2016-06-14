import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router-deprecated";

import { Hero } from "./models/hero";
import { HeroDetailComponent } from "./hero-detail.component";
import { HeroService } from "./hero.service";

import { Store } from "@ngrx/store";
import { Observable } from "rxjs/Observable";

import { HeroActions } from "./actions/hero.action";
import { heroReducer } from "./reducers/hero.reducer";

interface AppState {
	heroes: Hero[];
}

@Component({
	selector: "my-heroes",
	templateUrl: "app/heroes.component.html",
	styleUrls:["app/heroes.component.css"],
	directives: [HeroDetailComponent]
})
export class HeroesComponent implements OnInit {
	counter: Observable<number>;

	selectedHero: Hero;
	heroes: Observable<Hero[]>;
	addingHero = false;
	error: any;

	constructor(
		private router: Router,
		private heroService: HeroService,
		public store: Store<AppState>
	) {
		this.heroes = store.select('heroes');
	}
	
	onSelect(hero: Hero) { this.selectedHero = hero; };
	
	ngOnInit() {
		this.initHeroes();

		this.store.subscribe(state => console.log(state));
	}

	initHeroes() {
		this.heroService.getHeroes()
			.then(heroes => {
				this.store.dispatch({ type: HeroActions.INIT_COLLECTION, payload: heroes });
			});
	}

	gotoDetail() {
		this.router.navigate(["HeroDetail", { id: this.selectedHero.id }]);
	}

	addHero() {
		this.addingHero = true;
		this.selectedHero = null;
	}

	close(savedHero: Hero) {
		this.addingHero = false;
	}

	delete(hero: Hero, event: any) {
		event.stopPropagation();
		this.heroService
			.delete(hero)
			.then(res => {
				this.store.dispatch({ type: HeroActions.REMOVE_FROM_COLLECTION, payload: hero });
				if(this.selectedHero === hero) { this.selectedHero = null; }
			})
			.catch(error => this.error = error);
	}
}