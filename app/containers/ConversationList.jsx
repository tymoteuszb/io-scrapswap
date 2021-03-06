import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import _ from 'lodash';

import { List, ListItem } from 'material-ui/List';
import Divider from 'material-ui/Divider';
import Subheader from 'material-ui/Subheader';
import Avatar from 'material-ui/Avatar';
import IconButton from 'material-ui/IconButton';
import MenuItem from 'material-ui/MenuItem';
import {green400} from 'material-ui/styles/colors';
import TextField from 'material-ui/TextField';
import CircularProgress from 'material-ui/CircularProgress';
import LinearProgress from 'material-ui/LinearProgress';
import MessageIcon from 'material-ui/svg-icons/communication/message';

import Conversation from 'components/Conversation';
import ConversationMessageInput from 'components/ConversationMessageInput';

import { conversationsInitialFetch, selectConversation } from 'actions/conversations';

const styles = {
  noConversationsContainer: {
    padding: '30px 0px',
    textAlign: 'center',
    width: 'calc(100% - 60px)',
    maxWidth: '800px',
    margin: '0px auto'
  },

  mainContainer: {
    width: 'calc(100% - 60px)',
    maxWidth: '1200px',
    margin: '0px auto',
    padding: '30px 0px',
    display: 'flex',
    alignItems: 'flex-start'
  },

  floatingButton: {
    position: 'fixed',
    bottom: '15px',
    right: '15px'
  },

  navigationContainer: {
    width: '350px',
    boxShadow: '0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)'
  },

  messagingContainer: {
    display: 'flex',
    flexGrow: '1',
    marginLeft: '30px',
    height: 'calc(100vh - 195px)',
    flexDirection: 'column'
  },

  conversationContainer: {
    display: 'flex'
  },

  spacerContainer: {
    display: 'flex',
    flexGrow: '1'
  },

  selectedItem: {
    backgroundColor: '#dedede'
  },

  hide: {
    display: 'none'
  },

  conversationProgress: {
    alignSelf: 'center'
  },

  conversationFrame: {
    display: 'flex',
    flexGrow: '1',
    flexDirection: 'column'
  }
};

class MessageListContainer extends Component {

  constructor(props) {
    super(props);
    this.renderConversationsList = this.renderConversationsList.bind(this);
    this.renderSelectedConversation = this.renderSelectedConversation.bind(this);
  }

  handleSelectConversation(id) {
    if (id !== this.props.conversation.selectedConversation._id) {
      this.props.dispatch(selectConversation(id));
    }
  }

  componentDidMount() {
    this.props.dispatch(conversationsInitialFetch());
  }

  renderConversationsList() {
    const { user, conversation: { conversations, selectedConversation } } = this.props;

    return conversations.map((conversation, key) => {
      const dividerStyle = {};

      if (key === conversations.length - 1) {
        dividerStyle.display = 'none';
      }

      const partner = _.first(conversation.members.filter(m => m._id !== user._id)) || _.first(conversation.members);
      const letter = partner.profile.name.split(/\s+/).map(i => i[0]).splice(0, 2).join('');

      return (
        <div key={key}>
          <ListItem
            onTouchTap={this.handleSelectConversation.bind(this, conversation._id)}
            leftAvatar={<Avatar backgroundColor={green400}>{letter}</Avatar>}
            primaryText={partner.profile.name}
            secondaryText={conversation.lastMessage.text}
            secondaryTextLines={1}
            style={selectedConversation._id === conversation._id ? styles.selectedItem : {}} />
          <Divider inset={true} style={dividerStyle} />
        </div>
      );
    });
  }

  renderSelectedConversation() {
    const { conversations, selectedConversation, pending } = this.props.conversation;

    if (pending) {
      return (
        <CircularProgress style={styles.conversationProgress} size={0.75} />
      );
    }

    if (selectedConversation) {
      const recipient = _.find(selectedConversation.members, m => m._id !== this.props.user._id) || _.first(selectedConversation.members);

      return (
        <div style={styles.conversationFrame}>
          <div style={styles.spacerContainer}></div>
          <div style={styles.conversationContainer}>
            <Conversation data={selectedConversation} />
          </div>
          <ConversationMessageInput style={styles.conversationProgress} recipient={recipient} />
        </div>
      );
    }

    return (<div></div>);
  }

  render() {
    const { conversations } = this.props.conversation;

    if (conversations.length === 0 && !this.props.conversation.initialLoad) {
      return (
        <div style={styles.noConversationsContainer}>
          Nie masz jeszcze żadnych konwersacji.
          Aby rozpocząć konwersację, kliknij przycisk "wyślij wiadomość" wybranym pod ogłoszeniem.
        </div>
      );
    }

    return (
      <div>
        <div style={this.props.conversation.initialLoad ? styles.hide : styles.mainContainer}>
          <div style={styles.navigationContainer} className="messages__navigation-container">
            <List>
              <Subheader>Twoje konwersacje</Subheader>
              { this.renderConversationsList() }
            </List>
          </div>
          <div style={styles.messagingContainer} className="messages__message-container">
            { this.renderSelectedConversation() }
          </div>
        </div>
        <LinearProgress mode="indeterminate" style={this.props.conversation.initialLoad ? {} : styles.hide} />
      </div>
    );
  }
}

export default connect((state) => {
  return {
    user: state.get('user').toJS(),
    conversation: state.get('conversation').toJS()
  };
})(MessageListContainer);
