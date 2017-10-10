import { combineEpics } from 'redux-observable';
import { REQUEST_POSTS_EPIC, requestPosts_succeed } from '../actions'
import { ajax } from 'rxjs/observable/dom/ajax';
import Rx from 'rxjs';

let fetch$ = path => {
  let json = fetch(`https://www.reddit.com/r/${path}.json`).then(res => {
    if (res.ok) {
      return res.json()
    }
    throw new Error('Network response was not ok.');
  });
  return Rx.Observable.fromPromise(json);
}

const postEpic = action$ =>
  action$.ofType(REQUEST_POSTS_EPIC)
    .mergeMap(action =>
      fetch$(action.subreddit)
        .map(res => {
          return requestPosts_succeed(action.subreddit, res)
        })
    )

export default combineEpics(
  postEpic,
);
