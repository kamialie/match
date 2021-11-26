import { BehaviorSubject } from 'rxjs';

const initialState = {
    type: '',
    min_age: 18,
    max_age: 99,
    min_distance: 0,
    max_distance: 200000,
    min_fame: 0,
    max_fame: 5,
    tags: [],
    country: [],
    order: [],
    sex_orientation: '',
};

export class FilterService {
    constructor() {
        this.filterSubject = new BehaviorSubject(initialState);
    }

    get filterValue() {
        return this.filterSubject.getValue();
    }

    get filter() {
        return this.filterSubject.asObservable();
    }

    updateFilter(filterName, value) {
        const newFilter = { ...this.filterSubject.value };
        newFilter[`${filterName}`] = value;
        this.filterSubject.next(newFilter);
    }

    reset() {
        this.filterSubject.next(initialState);
    }
}
