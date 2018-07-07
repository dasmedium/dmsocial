import { ADD_POST, GET_POSTS, POST_LOADING } from "../actions/types";

const initalState = {
  posts: [],
  post: {},
  loading: false
};

export default function(state = initalState, action) {
  switch (action.type) {
    case ADD_POST:
      return {
        ...state,
        posts: [action.payload, ...state.posts]
      };
    case GET_POSTS:
      return {
        ...state,
        posts: action.payload,
        loading: false
      };
    case POST_LOADING:
      return {
        ...state,
        loading: true
      };
    default:
      return state;
  }
}