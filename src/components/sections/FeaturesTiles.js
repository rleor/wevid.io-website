import React from 'react';
import classNames from 'classnames';
import { SectionTilesProps } from '../../utils/SectionProps';
import SectionHeader from './partials/SectionHeader';
import Image from '../elements/Image';

const propTypes = {
  ...SectionTilesProps.types
}

const defaultProps = {
  ...SectionTilesProps.defaults
}

class FeaturesTiles extends React.Component {

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
      'features-tiles section center-content',
      topOuterDivider && 'has-top-divider',
      bottomOuterDivider && 'has-bottom-divider',
      hasBgColor && 'has-bg-color',
      invertColor && 'invert-color',
      className
    );

    const innerClasses = classNames(
      'features-tiles-inner section-inner',
      topDivider && 'has-top-divider',
      bottomDivider && 'has-bottom-divider'
    );

    const tilesClasses = classNames(
      'tiles-wrap',
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
        <div className="container">
          <div className={innerClasses}>
            <SectionHeader data={sectionHeader} className="center-content" />
            <div className={tilesClasses}>

              <div className="tiles-item reveal-scale-up">
                <div className="tiles-item-inner">
                  <div className="features-tiles-item-header">
                    {/* <div className="features-tiles-item-image mb-16"> */}
                      <Image
                        src={require('./../../assets/images/feature-tile-icon-01.png')}
                        alt="Features tile icon 01"
                        width={160}
                        height={160} />
                    {/* </div> */}
                  </div>
                  <div className="features-tiles-item-content">
                    <h4 className="mt-0 mb-8">
                      万能网盘
                    </h4>
                    <p className="m-0 text-sm">
                      云端管理素材资源,智能分类、备份
                    </p>
                  </div>
                </div>
              </div>

              <div className="tiles-item reveal-scale-up" data-reveal-delay="200">
                <div className="tiles-item-inner">
                  <div className="features-tiles-item-header">
                    {/* <div className="features-tiles-item-image mb-16"> */}
                      <Image
                        src={require('./../../assets/images/feature-tile-icon-02.png')}
                        alt="Features tile icon 02"
                        width={160}
                        height={160} />
                    {/* </div> */}
                  </div>
                  <div className="features-tiles-item-content">
                    <h4 className="mt-0 mb-8">
                      不限速访问
                    </h4>
                    <p className="m-0 text-sm">
                      不限速下载，上传视频素材，所有资源触手可及
                    </p>
                  </div>
                </div>
              </div>

              <div className="tiles-item reveal-scale-up" data-reveal-delay="400">
                <div className="tiles-item-inner">
                  <div className="features-tiles-item-header">
                    {/* <div className="features-tiles-item-image mb-16"> */}
                      <Image
                        src={require('./../../assets/images/feature-tile-icon-03.png')}
                        alt="Features tile icon 03"
                        width={160}
                        height={160} />
                    {/* </div> */}
                  </div>
                  <div className="features-tiles-item-content">
                    <h4 className="mt-0 mb-8">
                      团队角色权限管理
                    </h4>
                    <p className="m-0 text-sm">
                      管理不同团队参与者、外部协作者、客户关于资源、评论、审核、分享的权限
                    </p>
                  </div>
                </div>
              </div>

              <div className="tiles-item reveal-scale-up">
                <div className="tiles-item-inner">
                  <div className="features-tiles-item-header">
                    {/* <div className="features-tiles-item-image mb-16"> */}
                      <Image
                        src={require('./../../assets/images/feature-tile-icon-04.png')}
                        alt="Features tile icon 04"
                        width={160}
                        height={160} />
                    {/* </div> */}
                  </div>
                  <div className="features-tiles-item-content">
                    <h4 className="mt-0 mb-8">
                      全平台客户端
                    </h4>
                    <p className="m-0 text-sm">
                      电脑、手机、iPad都有着友好一致的用户体验
                    </p>
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

FeaturesTiles.propTypes = propTypes;
FeaturesTiles.defaultProps = defaultProps;

export default FeaturesTiles;