import { HeroActions } from "../actions/hero.action";
import { Hero } from "../models/hero";

export const heroReducer = (state = [], action) => {
	switch (action.type) {
		case HeroActions.INIT_COLLECTION: {
			return [...state, ...action.payload];
		}
		case HeroActions.ADD_TO_COLLECTION: {
			return [...state, action.payload];
		}
		case HeroActions.REMOVE_FROM_COLLECTION: {
			const hero: Hero = action.payload;

			return state.filter((hero) => hero.id !== action.payload.id);
		}
	}
}