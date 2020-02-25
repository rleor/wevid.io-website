import React from 'react';
import classNames from 'classnames';
import { SectionProps } from '../../utils/SectionProps';
import { Link } from 'react-router-dom';
import SectionHeader from './partials/SectionHeader';
import Input from '../elements/Input';
import Button from '../elements/Button';
import axios from 'axios';
import { getQueryString } from '../../utils/index';

const propTypes = {
  ...SectionProps.types
}

const defaultProps = {
  ...SectionProps.defaults
}

class SignupForm extends React.Component {

  state = {
    phone: undefined,
    verify_text: '获取验证码',
    count_down: 60,
    code: undefined,
  };
  render() {
    let inviter = getQueryString(this.props.location.search, 'inviter');
    let invite_code = getQueryString(this.props.location.search, 'invite_code');
    const {
      className,
      topOuterDivider,
      bottomOuterDivider,      
      topDivider,
      bottomDivider,
      hasBgColor,
      invertColor,
      ...props
    } = this.props;

    const outerClasses = classNames(
      'signin section',
      topOuterDivider && 'has-top-divider',
      bottomOuterDivider && 'has-bottom-divider',
      hasBgColor && 'has-bg-color',
      invertColor && 'invert-color',
      className
    );

    const innerClasses = classNames(
      'signin-inner section-inner',
      topDivider && 'has-top-divider',
      bottomDivider && 'has-bottom-divider'
    );

    const sectionHeader = {
      title: 'Welcome. We exist to make entrepreneurship easier.',
    };

    const phoneChange = (e) => {
      this.setState({phone: e.target.value});
    };

    const verifyCodeChange = (e) => {
      this.setState({code: e.target.value});
    };
    
    const join_team = (invite_code, inviter_id) => {
      const access_token = localStorage.getItem('access_token');
      axios.post(`https://api.wevid.co/teams/join`, {
        invite_code: invite_code,
        inviter_id: inviter_id,
      }, {
        headers: {
          Authorization: `Bearer ${access_token}`, 
        }
      }).then(response => {
        console.log("join team response: ", response);
        window.location.href = 'https://app.wevid.co/';
      }).catch(error => {
        console.log("join team error: ", error);
        // jump to page any way.
        window.location.href = 'https://app.wevid.co/';
      });
    };

    const handleSubmit = (e) => {
      e.preventDefault();
      axios.post(`https://api.wevid.co/users/sign_in_sms`, {
        code: this.state.code,
        phone_number: this.state.phone,
      }).then(response => {
        console.log(response.data);
        localStorage.setItem("access_token", response.data.token);
        let user = response.data.user;
        localStorage.setItem("is_login", true);
        localStorage.setItem("login_user.id", user.id);
        localStorage.setItem("login_user.display_name", user.display_name);
        localStorage.setItem("login_user.phone_number", user.phone_number);

        if (user.display_name/* && user.owned_teams && user.owned_teams.length > 0*/) {
          if (invite_code !== null && inviter !== null) {
            join_team(invite_code, inviter);
          } else {
            window.location.href = 'https://app.wevid.co/';
          }
        } else {
          this.props.history.push(`/initiate${this.props.location.search}`);
        }
      }).catch(error => {
        let error_data = error.response.data;
        if (error_data.code === 'error.code_expire_invalid') {
          alert('无效的验证码');
        }
      });
    };

    const applyVerifyCode = () => {
      axios.post(`https://api.wevid.co/users/verify_code`, { phone_number: this.state.phone })
      .then(()=> {
        let ti = setInterval(()=> {
          let tick = this.state.count_down - 1;
          console.log("tick:", tick);
          if (tick === 0) {
            this.setState({
              verify_text: '获取验证码',
              count_down: 60,
            });
            clearInterval(ti);
          } else {
            this.setState({
              verify_text: tick + "秒",
              count_down: tick,
            });
          }
        }, 1000);
      }).catch(error => {
        alert("获取验证码失败");
      });
    };

    return (
      <section
        {...props}
        className={outerClasses}
      >
        <div className="container">
          <div className={innerClasses}>
            <SectionHeader tag="h1" data={sectionHeader} className="center-content" />
            <div className="tiles-wrap">
              <div className="tiles-item">
                <div className="tiles-item-inner">
                  <form onSubmit={handleSubmit}>
                    <fieldset>
                      {/* <div className="mb-12">
                        <Input
                          label="Full name"
                          placeholder="Full name" 
                          labelHidden
                          required />
                      </div> */}
                      <div className="mb-12">
                        <Input
                          type="tel"
                          label="手机号"
                          onChange={phoneChange}
                          placeholder="手机号"
                          labelHidden
                          required />
                      </div>
                      <div className="mb-12">
                        <Input
                          type="text"
                          label="验证码"
                          onChange={verifyCodeChange}
                          placeholder="验证码"
                          labelHidden
                          required >
                          <Button tag="a" color="primary" onClick={applyVerifyCode}>
                            {this.state.verify_text}
                          </Button>
                        </Input>
                      </div>
                      <div className="mt-24 mb-32">
                        <Button color="primary" wide>即刻开始</Button>
                      </div>
                    </fieldset>
                  </form>
                  <div className="signin-bottom has-top-divider">
                    <div className="pt-32 text-xs center-content text-color-low">
                      <Link to={`/login${this.props.location.search}`} className="func-link">账号密码登录</Link>
                    </div>
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

SignupForm.propTypes = propTypes;
SignupForm.defaultProps = defaultProps;

export default SignupForm;