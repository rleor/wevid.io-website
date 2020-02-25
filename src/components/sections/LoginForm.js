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

class LoginForm extends React.Component {

  state = {
    phone: undefined,
    password: undefined,
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
      title: 'Welcome back. We exist to make entrepreneurship easier.',
    };
    const phoneChange = (e) => {
      this.setState({phone: e.target.value});
    };
    const passwordChange = (e) => {
      this.setState({password: e.target.value});
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
    const handleSubmit = e => {
      e.preventDefault();

      axios.post(`https://api.wevid.co/users/sign_in`, {
        login: this.state.phone,
        password: this.state.password,
      }).then(response=> {
        console.log(response.data);
        localStorage.setItem("access_token", response.data.token);
        localStorage.setItem("is_login", true);
        localStorage.setItem("login_user.id", response.data.user.id);
        localStorage.setItem("login_user.username", response.data.user.username);
        localStorage.setItem("login_user.phone_number", response.data.user.phone_number);
        if (invite_code !== null && inviter !== null) {
            join_team(invite_code, inviter);
        } else {
          // window.location.href = 'http://localhost:8000/';
          window.location.href = 'https://app.wevid.co/';
        }
      }).catch(error=> {
        let error_data = error.response.data;
        if (error_data.code === 'error.invalid_username_password') {
          alert('用户名或密码不正确');
        }
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
                      <div className="mb-12">
                        <Input
                          type="tel"
                          label="手机号"
                          placeholder="手机号"
                          onChange={phoneChange}
                          labelHidden
                          required />
                      </div>
                      <div className="mb-12">
                        <Input
                          type="password"
                          label="密码"
                          placeholder="密码"
                          onChange={passwordChange}
                          labelHidden
                          required />
                      </div>
                      <div className="mt-24 mb-32">
                        <Button color="primary" wide>登录</Button>
                      </div>
                      {/* <div className="signin-footer mb-32">
                        <Checkbox>Remember me</Checkbox>
                        <Link to="/recover-password/" className="func-link text-xs">Forgot password?</Link>
                      </div> */}
                    </fieldset>
                  </form>
                  <div className="signin-bottom has-top-divider">
                    <div className="pt-32 text-xs center-content text-color-low">
                      <Link to={`/signup${this.props.location.search}`} className="func-link">验证码登录</Link>
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

LoginForm.propTypes = propTypes;
LoginForm.defaultProps = defaultProps;

export default LoginForm;