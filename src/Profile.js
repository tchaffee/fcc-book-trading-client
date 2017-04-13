import './Profile.css';

import React, { Component } from 'react';
import { Form, FormGroup, Button, FormControl, ControlLabel, HelpBlock } from 'react-bootstrap';
import { RegionDropdown } from 'react-country-region-selector';


const FieldGroup = ({ id, label, help, ...props }) => {
  return (
    <FormGroup controlId={id}>
      <ControlLabel>{label}</ControlLabel>
      <FormControl {...props} />
      {help && <HelpBlock>{help}</HelpBlock>}
    </FormGroup>
  );
}

class Profile extends Component {
  constructor (props) {
    super(props);
    this.state = {
      name: '',
      city: '',
      country: 'US',
      region: '',
      isFetching: false
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.selectRegion = this.selectRegion.bind(this);
    this.loadData = this.loadData.bind(this);
  }

  loadData(getProfile) {
    this.setState({ isFetching: true });
    
    return getProfile()
    .then(data => {
      console.log('data.user');
      console.log(data.user);
      this.setState({
        name: data.user.name,
        city: data.user.city,
        region: data.user.state,
        isFetching: false
      });
    });
  }

  selectRegion (val) {
    this.setState({ region: val });
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    const { name, city, region } = this.state;

    return this.props.updateProfile(name, city, region)
    .then( () => {
      this.loadData()
      .then(() => { 
        // TODO: How to show user profile was updated?
        console.log('Updated profile.');
      });
    })
    .catch(reason => {
      if ('Error: Unauthorized' === reason.toString()) {
        this.props.history.replace('/notauthorized');
      }
    });

  }

  componentWillMount () {
    this.loadData(this.props.getProfile);
  }

  render () {
    const { name, city, region } = this.state;

    // TODO: Region dropdown is broken and does not use the value property. This is an open issue
    //       on github. https://github.com/benkeen/react-country-region-selector/issues/12
    return (
      <div className="profileContainer container">
        <Form onSubmit={this.handleSubmit}>
          <FieldGroup
            id="formControlsName"
            name="name"
            type="text"
            label="Full Name"
            placeholder="Enter your full name"
            onChange={this.handleInputChange}
            value={name}
          />
          <FieldGroup
            id="formControlsCity"
            name="city"
            type="text"
            label="City"
            placeholder="Enter your city"
            onChange={this.handleInputChange}
            value={city}            
          />
          <div className="row">
            <FormGroup className="col-lg-2" controlId="formControlsSelect">
              <ControlLabel>State</ControlLabel>
              <RegionDropdown
                showDefaultOption={false}
                id="formControlsSelect"
                classes="form-control"
                country="US"
                name="region"
                countryValueType="short"
                value={region}
                labelType="short"
                valueType="short"
                onChange={(val) => this.selectRegion(val)}
              />
            </FormGroup>
          </div>
          <div className="row">
            <div className="col-lg-2">
              <Button type="submit">Update</Button>
            </div>
          </div>
        </Form>
      </div>
    );
  }
}

export default Profile;
