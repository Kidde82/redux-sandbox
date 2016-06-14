import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { RouteParams } from "@angular/router-deprecated";
import { Hero } from "./models/hero";
import { HeroService } from "./hero.service";

import { Store } from "@ngrx/store";
import { Observable } from "rxjs/Observable";

import { HeroActions } from "./actions/hero.action";
import { heroReducer } from "./reducers/hero.reducer";

interface AppState {
	hero: Hero;
}

@Component({
	selector: "my-hero-detail",
	templateUrl: "app/hero-detail.component.html",
	styleUrls: ["app/hero-detail.component.css"]
})
export class HeroDetailComponent implements OnInit {
	@Input() hero: Hero;
	@Output() close = new EventEmitter();
	error: any;
	navigated = false;

	constructor(
		private heroService: HeroService,
		private routeParams: RouteParams,
		public store: Store<AppState>
	) {	}

	ngOnInit() {
		if (this.routeParams.get("id") !== null) {
			let id = +this.routeParams.get("id");
			this.navigated = true;
			this.heroService.getHero(id)
				.then(() => {
					this.store.dispatch({ type: HeroActions.LOAD_HERO, payload: id});
				});
		} else {
			this.navigated = false;
			this.hero = new Hero();
		}
	}

	save() {
		this.heroService
			.save(this.hero)
			.then(hero => {
				this.store.dispatch({ type: HeroActions.ADD_TO_COLLECTION, payload: hero});
				this.goBack(hero);
			})
			.catch(error => this.error = error);
	}

	goBack(savedHero: Hero = null) {
		this.close.emit(savedHero);
		if (this.navigated) { window.history.back(); }
	}
}