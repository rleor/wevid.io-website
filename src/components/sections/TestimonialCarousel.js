import React from 'react';
import classNames from 'classnames';
import { SectionTilesProps } from '../../utils/SectionProps';
import SectionHeader from './partials/SectionHeader';
import Carousel from '../elements/Carousel';
import CarouselItem from '../elements/CarouselItem';
import Image from '../elements/Image';

const propTypes = {
  ...SectionTilesProps.types
}

const defaultProps = {
  ...SectionTilesProps.defaults
}

class Testimonial extends React.Component {

  render() {

    const {
      className,
      topOuterDivider,
      bottomOuterDivider,      
      topDivider,
      bottomDivider,
      hasBgColor,
      invertColor,
      pushLeft,
      ...props
    } = this.props;

    const outerClasses = classNames(
      'testimonial section center-content',
      topOuterDivider && 'has-top-divider',
      bottomOuterDivider && 'has-bottom-divider',
      hasBgColor && 'has-bg-color',
      invertColor && 'invert-color',
      className
    );

    const innerClasses = classNames(
      'testimonial-inner section-inner',
      topDivider && 'has-top-divider',
      bottomDivider && 'has-bottom-divider'
    );

    const tilesClasses = classNames(
      'tiles-wrap reveal-scale-up',
      pushLeft && 'push-left'
    );

    const sectionHeader = {
      title: '',
      paragraph: ''
    };

    return (
      <section
        {...props}
        className={outerClasses}
      >
        <div className="container-xs">
          <div className={innerClasses}>
            <SectionHeader data={sectionHeader} className="center-content" />
            <Carousel className={tilesClasses}
              autorotate
              autorotateTiming={7000}>

              <CarouselItem className="tiles-item">
                <div className="tiles-item-inner">
                  <div className="testimonial-item-header mb-16">
                    <div className="testimonial-item-image">
                      <Image
                        src={require('./../../assets/images/testimonial-image-01.png')}
                        alt="Testimonial 01"
                        width={56}
                        height={56} />
                    </div>
                  </div>
                  <div className="testimonial-item-content">
                    <p className="m-0">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Excepteur sint occaecat cupidatat non proident.
                    </p>
                  </div>
                </div>
              </CarouselItem>

              <CarouselItem className="tiles-item">
                <div className="tiles-item-inner">
                  <div className="testimonial-item-header mb-16">
                    <div className="testimonial-item-image">
                      <Image
                        src={require('./../../assets/images/testimonial-image-02.png')}
                        alt="Testimonial 02"
                        width={56}
                        height={56} />
                    </div>
                  </div>
                  <div className="testimonial-item-content">
                    <p className="m-0">
                      Excepteur sint occaecat cupidatat non proident. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                    </p>
                  </div>
                </div>
              </CarouselItem>

              <CarouselItem className="tiles-item">
                <div className="tiles-item-inner">
                  <div className="testimonial-item-header mb-16">
                    <div className="testimonial-item-image">
                      <Image
                        src={require('./../../assets/images/testimonial-image-03.png')}
                        alt="Testimonial 03"
                        width={56}
                        height={56} />
                    </div>
                  </div>
                  <div className="testimonial-item-content">
                    <p className="m-0">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Excepteur sint occaecat cupidatat non proident.
                    </p>
                  </div>
                </div>
              </CarouselItem>

            </Carousel>
          </div>
        </div>
      </section>
    );
  }
}

Testimonial.propTypes = propTypes;
Testimonial.defaultProps = defaultProps;

export default Testimonial;