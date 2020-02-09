import React from 'react';
import InitiateForm from '../components/sections/InitiateForm';

class Initiate extends React.Component {
  render() {
    return (
      <InitiateForm className="illustration-section-01" {...this.props}/>
    );
  }
}

export default Initiate;