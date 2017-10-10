export const REQUEST_POSTS = 'REQUEST_POSTS'
export const RECEIVE_POSTS = 'RECEIVE_POSTS'
export const SELECT_SUBREDDIT = 'SELECT_SUBREDDIT'
export const INVALIDATE_SUBREDDIT = 'INVALIDATE_SUBREDDIT'
export const REQUEST_POSTS_EPIC = 'REQUEST_POSTS_EPIC'
export const RECEIVE_POSTS_SUCCEED = 'RECEIVE_POSTS_SUCCEED'


export function selectSubreddit(subreddit) {
  return {
    type: SELECT_SUBREDDIT,
    subreddit
  }
}

export function invalidateSubreddit(subreddit) {
  return {
    type: INVALIDATE_SUBREDDIT,
    subreddit
  }
}


function requestPostsEpic(subreddit) {
  return {
    type: REQUEST_POSTS_EPIC,
    subreddit
  }
}

export function requestPosts_succeed(subreddit,json) {
  return {
    type: RECEIVE_POSTS_SUCCEED,
    subreddit,
    posts: json.data.children.map(child => child.data),
    receivedAt: Date.now()
  }
}


function fetchPosts(subreddit) {
  return dispatch => {
    dispatch(requestPostsEpic(subreddit));
  }
}

function shouldFetchPosts(state, subreddit) {
  const posts = state.postsBySubreddit[subreddit]
  if (!posts) {
    return true
  } else if (posts.isFetching) {
    return false
  } else {
    return posts.didInvalidate
  }
}

export function fetchPostsIfNeeded(subreddit) {
  return (dispatch, getState) => {
    if (shouldFetchPosts(getState(), subreddit)) {
      return dispatch(fetchPosts(subreddit))
    }
  }
}