import createDataContext from './createDataContext';
import jsonServer from '../api/jsonServer';

const blogReducer = (state, action) => {
  switch (action.type) {

    case 'get_blogposts':
      return action.payload;
    case 'edit_blogpost':
      return state.map(blogPost => {
        return blogPost.id === action.payload.id ? action.payload : blogPost;
      });
    case 'delete_blogpost':
      return state.filter(blogPost => blogPost.id !== action.payload);
    // case 'add_blogpost':
    //   return [
    //     ...state,
    //     {
    //       id: Math.floor(Math.random() * 99999),
    //       title: action.payload.title,
    //       content: action.payload.content
    //     }
    //   ];
    default:
      return state;
  }
};

const getBlogPost = dispatch => {
  return async () => {
    const response = await jsonServer.get('/blogposts');
    dispatch({ type: 'get_blogposts', payload: response.data});
    //response.data holds our data
  };
};

const addBlogPost = dispatch => {
  return async (title, content, callback) => {

    await jsonServer.post('/blogposts', {title: title, content: content});
    // dispatch({ type: 'add_blogpost', payload: { title, content } });
   // we removed dispatch as we are now storing value in server

    if(callback){
      callback();
    }
  };
};
const deleteBlogPost = dispatch => {
  return async id => {
    await jsonServer.delete(`/blogposts/${id}`);

     dispatch({ type: 'delete_blogpost', payload: id });
     // we could either dispatch like this..which removes it from local state without fetching server or we could instead fetch again from server
  };
};

const editBlogPost = dispatch => {
  return async (id, title, content, callback) => {

    await jsonServer.put(`/blogposts/${id}`,{ title: title, content: content});

    dispatch({ type: 'edit_blogpost', payload: {id, title, content}});
    //we could either call this dispatch or fetch data again from server
    if(callback){
      callback();
      // we are putting this inside if bcoz sometimes when we add additional features, we might call editBlogPost without calling callback
    }
  };
};

export const { Context, Provider } = createDataContext(
  blogReducer,
  { addBlogPost, deleteBlogPost, editBlogPost, getBlogPost },
  []
  //default value should be mentioned inside this empty array
);
