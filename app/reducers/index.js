import { combineReducers } from 'redux-immutable';
import user from 'reducers/user';
import layout from 'reducers/layout';
import advert from 'reducers/advert';
import routing from 'reducers/routing';
import category from 'reducers/category';
import { reducer as form } from 'redux-form/immutable';

const rootReducer = combineReducers({
  user,
  layout,
  advert,
  routing,
  form,
  category
});

export default rootReducer;
