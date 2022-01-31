/*
프로미스를 다루는 리덕스 모듈을 다룰 땐 다음과 같은 사항을 고려해야 한다.
1. 프로미스가 시작, 성공, 실패했을 때 다른 액션을 디스패치해야 한다.
2. 각 프로미스마다 thunk 함수를 만들어줘야 한다.
3. 리듀서에서 액션에 따라 로딩중, 결과, 에러 상태를 변경해줘야 한다.
*/

import * as postsAPI from '../api/posts';
import { createPromiseThunk, reducerUtils, handleAsyncActions } from '../lib/asyncUtils';

// 액션 타입

// 포스트 여러 개 조회하기
const GET_POSTS = 'GET_POSTS'; // 요청 시작
const GET_POSTS_SUCCESS = 'GET_POSTS_SUCCESS'; // 요청 성공
const GET_POSTS_ERROR = 'GET_POSTS_ERROR' // 요청 실패

// 포스트 하나 조회하기
const GET_POST = 'GET_POST';
const GET_POST_SUCCESS = 'GET_POST_SUCCESS';
const GET_POST_ERROR = 'GET_POST_ERROR';

export const getPosts = createPromiseThunk(GET_POSTS, postsAPI.getPosts);
export const getPost = createPromiseThunk(GET_POST, postsAPI.getPostById);

const initialState = {
  posts: reducerUtils.initial(),
  post: reducerUtils.initial()
};

export default function posts(state = initialState, action) {
  switch (action.type) {
    case GET_POSTS:
    case GET_POSTS_SUCCESS:
    case GET_POSTS_ERROR:
      return handleAsyncActions(GET_POSTS, 'posts')(state, action);
      // 혹은 아래와 같이 표현할 수도 있다.
      // const postsReducer = handleAsyncActions(GET_POSTS, 'posts');
      // return postsReducer(state, action);
    case GET_POST:
    case GET_POST_SUCCESS:
    case GET_POST_ERROR:
      return handleAsyncActions(GET_POST, 'post')(state, action);

    default:
      return state;
  }
}
