import React, { Component, PropTypes } from 'react';

import moment from 'moment';

import LocationIcon from 'material-ui/svg-icons/communication/location-on';
import DateIcon from 'material-ui/svg-icons/action/event';
import { green500 } from 'material-ui/styles/colors';

const styles = {
  container: {
    display: 'flex',
    flex: '1'
  },

  contentBox: {
    container: {
      padding: '25px 25px 60px 15px',
      fontSize: '18px',
      color: '#333',
      fontWeight: '400',
      lineHeight: '24px'
    }
  },

  titleBox: {
    container: {
      color: '#555',
      background: '#fbfbfb',
      width: '100%',
      padding: '15px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      boxShadow: '0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)'
    },

    title: {
      fontWeight: '300',
      fontSize: '36px',
      letterSpacing: '0.01em'
    },

    details: {
      display: 'block',
      fontSize: '14px',
      textAlign: 'right'
    },

    icon: {
      width: '16px',
      verticalAlign: 'middle',
      color: green500
    }
  }
};

class Advert extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    let { data: advert } = this.props;

    return (
      <div>
        <div style={ styles.titleBox.container }>
          <span style={ styles.titleBox.title }>{ advert.title }</span>
          <div style={ styles.titleBox.details }>
            <DateIcon style={styles.titleBox.icon} color={styles.titleBox.icon.color} /> { moment(advert.date).fromNow() }<br/>
            <LocationIcon style={styles.titleBox.icon} color={styles.titleBox.icon.color} /> { advert.location }
          </div>
        </div>
        <div style={ styles.contentBox.container }>
          { advert.body }
        </div>
      </div>
    );
  }
}

export default Advert;

Advert.propTypes = {
  data: PropTypes.object.isRequired
};