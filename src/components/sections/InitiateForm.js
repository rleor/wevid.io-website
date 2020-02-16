import React from 'react';
import classNames from 'classnames';
import { SectionProps } from '../../utils/SectionProps';
import SectionHeader from './partials/SectionHeader';
import Input from '../elements/Input';
import Button from '../elements/Button';
import axios from 'axios';
import Cookies from 'js-cookie';

const propTypes = {
  ...SectionProps.types
}

const defaultProps = {
  ...SectionProps.defaults
}

class InitiateForm extends React.Component {

  state = {
    name: undefined,
    teamName: undefined,
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
      title: '请输入昵称和团队名称',
    };
    const nameChange = (e) => {
      this.setState({name: e.target.value});
    };
    const teamNameChange = (e) => {
      this.setState({teamName: e.target.value});
    };
    const handleSubmit = e => {
      e.preventDefault();

      const access_token = Cookies.get('access_token');
      axios.post(`http://47.110.10.120:3000/users/signup_initialize`, {
        display_name: this.state.name,
        team_name: this.state.teamName,
      }, {
        headers: {
          Authorization: `Bearer ${access_token}`, 
        }
      }).then(response=> {
        console.log(response.data);
        window.location.href = 'http://47.110.10.120/';
      }).catch(error=> {
        let error_data = error.response.data;
        if (error_data.code === 'error.team.duplicate_name') {
          alert('团队名已存在，请更换团队名');
        } else {
          alert('对不起，出现内部错误');
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
                          type="text"
                          label="昵称"
                          placeholder="昵称"
                          onChange={nameChange}
                          labelHidden
                          required />
                      </div>
                      <div className="mb-12">
                        <Input
                          type="text"
                          label="团队名称"
                          placeholder="团队名称"
                          onChange={teamNameChange}
                          labelHidden
                          required />
                      </div>
                      <div className="mt-24 mb-32">
                        <Button color="primary" wide>完成创建</Button>
                      </div>
                      {/* <div className="signin-footer mb-32">
                        <Checkbox>Remember me</Checkbox>
                        <Link to="/recover-password/" className="func-link text-xs">Forgot password?</Link>
                      </div> */}
                    </fieldset>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

InitiateForm.propTypes = propTypes;
InitiateForm.defaultProps = defaultProps;

export default InitiateForm;