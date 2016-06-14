import { Injectable } from "@angular/core";
import { Action } from "@ngrx/store";
import { Hero } from "../models/hero";

@Injectable()
export class HeroActions {
	static INIT_COLLECTION = "[Hero] Init collection";
	initCollection(heroes: Hero[]): Action {
		return {
			type: HeroActions.INIT_COLLECTION,
			payload: heroes
		}
	}

	static ADD_TO_COLLECTION = "[Hero] Add to collection";
	addToCollection(hero: Hero): Action {
		return {
			type: HeroActions.ADD_TO_COLLECTION,
			payload: hero
		}
	}

	static REMOVE_FROM_COLLECTION = "[Hero] Remove from collection";
	removeFromCollection(hero: Hero): Action {
		return {
			type: HeroActions.REMOVE_FROM_COLLECTION,
			payload: hero
		}
	}

	static LOAD_HERO = "[Hero] Load hero";
	loadHero(id: Number): Action {
		return {
			type: HeroActions.LOAD_HERO,
			payload: id
		}
	}
}