import React, { PropTypes } from 'react';
import AppHeader from 'components/Navigation';
import LayoutComponents from 'components/LayoutComponents';

const App = ({children}) => {
  return (
    <div>
      <AppHeader />
      <LayoutComponents />
        {children}
    </div>
  );
};

App.propTypes = {
  children: PropTypes.object
};

export default App;
