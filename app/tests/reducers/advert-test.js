import Immutable from 'immutable';
import expect from 'expect';

import advertReducer from 'reducers/advert';
import { ADD_ADVERT_SUCCESS } from 'constants';

describe('Advert reducer', () => {
  it('checks if default state is set properly', () => {
    let defaultState = advertReducer(undefined, {});

    let expectedDefaultState = {
      pending: false,
      initialLoad: false,
      adverts: [],
      confirmDelete: null,
      dialogOpen: false,
      messageDialogOpen: false,
      searchQuery: ''
    };

    expect(defaultState.toJS()).toEqual(expectedDefaultState);
  });
});
