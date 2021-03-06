import io from 'socket.io-client';
import { LOGIN_SUCCESS, REGISTER_SUCCESS } from 'constants/index';
import { receiveMessage } from 'actions/conversations';
import { incrementUnreadMessages } from 'actions/users';
 
var socket = null;
 
export function conversationMiddleware(store) {
  return next => action => {
    if (socket && action.type === LOGIN_SUCCESS && action.type === REGISTER_SUCCESS) {
      socket.emit('init', action.data.user._id);
    }
    return next(action);
  };
};
 
export default function (store) {
  socket = io.connect(`${location.protocol}//${location.host}`);

  const loggedUserId = store.getState().get('user').get('_id');
  if (loggedUserId) {
    socket.on('connect', () => {
      socket.emit('init', loggedUserId);
    });
  }
 
  socket.on('message', data => {
    store.dispatch(receiveMessage(data));
    if (store.getState().get('routing').get('locationBeforeTransitions').get('pathname') !== 'messages') {
      store.dispatch(incrementUnreadMessages());
    }
  });
};
