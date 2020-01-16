import React from 'react';
import classNames from 'classnames';
import { SectionProps } from '../../utils/SectionProps';
import { Link } from 'react-router-dom';
import SectionHeader from './partials/SectionHeader';
import Input from '../elements/Input';
import Button from '../elements/Button';
import Checkbox from '../elements/Checkbox';
import axios from 'axios';
import Cookies from 'js-cookie';

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
    const handleSubmit = e => {
      e.preventDefault();

      axios.post(`http://47.110.10.120:3000/users/sign_in`, {
        login: this.state.phone,
        password: this.state.password,
      }).then(response=> {
        console.log(response.data);
        Cookies.set("access_token", response.data.token);
        Cookies.set("is_login", true);
        Cookies.set("login_user.id", response.data.user.id);
        Cookies.set("login_user.username", response.data.user.username);
        Cookies.set("login_user.phone_number", response.data.user.phone_number);
        // window.location.href = 'http://localhost:8000/';
        window.location.href = 'http://47.110.10.120/';

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
                      <Link to="/signup/" className="func-link">验证码登录</Link>
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