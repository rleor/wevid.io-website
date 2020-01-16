import React from 'react';
import HeroFull from '../components/sections/HeroFull';
import FeaturesTiles from '../components/sections/FeaturesTiles';
import FeaturesSplit from '../components/sections/FeaturesSplit';
import Pricing from '../components/sections/Pricing';
import Testimonial from '../components/sections/TestimonialCarousel';

class Home extends React.Component {
  render() {
    return (
      <React.Fragment>
        <HeroFull className="illustration-section-01" />
        <FeaturesTiles className="illustration-section-02" />
        <FeaturesSplit invertMobile topDivider imageFill />
        <Pricing topDivider pricingSwitcher />
        <Testimonial className="illustration-section-07" />
      </React.Fragment>
    );
  }
}

export default Home;