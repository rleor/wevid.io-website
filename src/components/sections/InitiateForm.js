import React from 'react';
import classNames from 'classnames';
import { SectionProps } from '../../utils/SectionProps';
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

class InitiateForm extends React.Component {

  state = {
    name: undefined,
    teamName: undefined,
  };

  render() {
    let inviter_id = getQueryString(this.props.location.search, 'inviter');
    let invite_code = getQueryString(this.props.location.search, 'invite_code');
    let type = getQueryString(this.props.location.search, 'type');

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

      const access_token = localStorage.getItem('access_token');
      let headers = { Authorization: `Bearer ${access_token}`, };
      let payload = {
        display_name: this.state.name,
      };
      if (invite_code === null || inviter_id === null) {
        payload = {
          ...payload,
          team_name: this.state.teamName,
        };
      }
      axios.post(`https://api.wevid.co/users/signup_initialize`, { ...payload }, { headers, })
      .then(response=> {
        console.log(response.data);
        let url;
        let req_body = {inviter_id};
        if (type === 'team') {
          url = `https://api.wevid.co/teams/join`;
          req_body = { ...req_body, invite_code, };
        } else {
          url = `https://api.wevid.co/projects/join`;
          req_body = { ...req_body, share_code: invite_code, };
        }

        axios.post(url, req_body, { headers, }).then(response => {
          console.log(`join ${type} response: `, response);
          window.location.href = 'https://app.wevid.co/';
        }).catch(error => {
          console.log(`join ${type} error: `, error);
          window.location.href = 'https://app.wevid.co/';
        });
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
                      {(inviter_id === null || invite_code == null) && 
                      <div className="mb-12">
                        <Input
                          type="text"
                          label="团队名称"
                          placeholder="团队名称"
                          onChange={teamNameChange}
                          labelHidden
                          required />
                      </div>
                      }
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