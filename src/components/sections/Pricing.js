import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { SectionTilesProps } from '../../utils/SectionProps';
import SectionHeader from './partials/SectionHeader';
import Switch from '../elements/Switch';
import Button from '../elements/Button';

const propTypes = {
  ...SectionTilesProps.types,
  pricingSwitcher: PropTypes.bool
}

const defaultProps = {
  ...SectionTilesProps.defaults,
  pricingSwitcher: false
}

class Pricing extends React.Component {

  state = {
    pricingSwitchOn: true
  }

  handlePricingSwitch = (e) => {
    this.setState({ pricingSwitchOn: e.target.checked });
  }

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
      pricingSwitcher,
      ...props
    } = this.props;

    const outerClasses = classNames(
      'pricing section',
      topOuterDivider && 'has-top-divider',
      bottomOuterDivider && 'has-bottom-divider',
      hasBgColor && 'has-bg-color',
      invertColor && 'invert-color',
      className
    );

    const innerClasses = classNames(
      'pricing-inner section-inner pb-0',
      topDivider && 'has-top-divider',
      bottomDivider && 'has-bottom-divider'
    );

    const tilesClasses = classNames(
      'tiles-wrap illustration-section-08',
      pushLeft && 'push-left'
    );

    const sectionHeader = {
      title: 'Storm template pricing',
      paragraph: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore aliqua.'
    };

    return (
      <section
        {...props}
        className={outerClasses}
      >
        <div className="container">
          <div className={innerClasses}>
            <SectionHeader data={sectionHeader} className="center-content" />
            {pricingSwitcher &&
              <div className="pricing-switcher center-content">
                <Switch
                  checked={this.state.pricingSwitchOn}
                  onChange={this.handlePricingSwitch}
                  rightLabel="Billed Annually">
                    Billed Monthly
                </Switch>
              </div>
            }
            <div className={tilesClasses}>

              <div className="tiles-item reveal-rotate-from-left" data-reveal-delay="100">
                <div className="tiles-item-inner">
                  <div className="pricing-item-content">
                    <div className="pricing-item-header pb-24 mb-24">
                      <div className="pricing-item-price mb-4">
                        <span className="pricing-item-price-currency h2">$</span>
                        <span className="pricing-item-price-amount h1">{this.state.pricingSwitchOn ? '44' : '55'}</span>
                      </div>
                      <div className="text-xs">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.
                      </div>
                    </div>
                    <div className="pricing-item-features mb-40">
                      <div className="pricing-item-features-title h6 text-xs text-color-high mb-24">
                        What’s included
                      </div>
                      <ul className="pricing-item-features-list list-reset text-xs mb-32">
                        <li className="is-checked">Excepteur sint occaecat velit</li>
                        <li className="is-checked">Excepteur sint occaecat velit</li>
                        <li className="is-checked">Excepteur sint occaecat velit</li>
                        <li>Excepteur sint occaecat velit</li>
                        <li>Excepteur sint occaecat velit</li>
                      </ul>
                    </div>
                  </div>
                  <div className="pricing-item-cta mb-8">
                    <Button tag="a" color="primary" wide href="http://cruip.com/">Start free trial</Button>
                  </div>
                </div>
              </div>

              <div className="tiles-item reveal-scale-down">
                <div className="tiles-item-inner">
                  <div className="pricing-item-content">
                    <div className="pricing-item-header pb-24 mb-24">
                      <div className="pricing-item-price mb-4">
                        <span className="pricing-item-price-currency h2">$</span>
                        <span className="pricing-item-price-amount h1">{this.state.pricingSwitchOn ? '74' : '85'}</span>
                      </div>
                      <div className="text-xs">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.
                      </div>
                    </div>
                    <div className="pricing-item-features mb-40">
                      <div className="pricing-item-features-title h6 text-xs text-color-high mb-24">
                        What’s included
                      </div>
                      <ul className="pricing-item-features-list list-reset text-xs mb-32">
                        <li className="is-checked">Excepteur sint occaecat velit</li>
                        <li className="is-checked">Excepteur sint occaecat velit</li>
                        <li className="is-checked">Excepteur sint occaecat velit</li>
                        <li className="is-checked">Excepteur sint occaecat velit</li>
                        <li>Excepteur sint occaecat velit</li>
                      </ul>
                    </div>
                  </div>
                  <div className="pricing-item-cta mb-8">
                    <Button tag="a" color="primary" wide href="http://cruip.com/">Start free trial</Button>
                  </div>
                </div>
              </div>

              <div className="tiles-item reveal-rotate-from-right" data-reveal-delay="100">
                <div className="tiles-item-inner">
                  <div className="pricing-item-content">
                    <div className="pricing-item-header pb-24 mb-24">
                      <div className="pricing-item-price mb-4">
                        <span className="pricing-item-price-currency h2">$</span>
                        <span className="pricing-item-price-amount h1">{this.state.pricingSwitchOn ? '94' : '105'}</span>
                      </div>
                      <div className="text-xs">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.
                      </div>
                    </div>
                    <div className="pricing-item-features mb-40">
                      <div className="pricing-item-features-title h6 text-xs text-color-high mb-24">
                        What’s included
                      </div>
                      <ul className="pricing-item-features-list list-reset text-xs mb-32">
                        <li className="is-checked">Excepteur sint occaecat velit</li>
                        <li className="is-checked">Excepteur sint occaecat velit</li>
                        <li className="is-checked">Excepteur sint occaecat velit</li>
                        <li className="is-checked">Excepteur sint occaecat velit</li>
                        <li className="is-checked">Excepteur sint occaecat velit</li>
                      </ul>
                    </div>
                  </div>
                  <div className="pricing-item-cta mb-8">
                    <Button tag="a" color="primary" wide href="http://cruip.com/">Start free trial</Button>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>
    );
  }
}

Pricing.propTypes = propTypes;
Pricing.defaultProps = defaultProps;

export default Pricing;