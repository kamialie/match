import { BehaviorSubject } from 'rxjs';

const initialState = {
    match: [],
    count: 6,
    iStart: 0,
    iEnd: 0,
    loading: false,
    error: {},
};

export class MatchService {
    constructor() {
        this.matchSubject = new BehaviorSubject(initialState);
    }

    get matchValue() {
        return this.matchSubject.getValue();
    }

    get match() {
        return this.matchSubject.asObservable();
    }

    getRecommend(route, filterIsOn) {
        const page = route.split('/')[3];
        const data =
            filterIsOn > 0
                ? page === 'filter'
                    ? getState().match.filter
                    : { type: page, order: [] }
                : {};
        try {
            // const result =
            //     filterIsOn > 0
            //         ? await matchService.matchFilter(data)
            //         : await matchService.getMatch(route);
            // dispatch({
            //     type: GET_MATCH,
            //     payload: result,
            // });
        } catch (err) {
            // dispatch({
            //     type: MATCH_ERROR,
            //     payload: { msg: err },
            // });
        }
    }
}
