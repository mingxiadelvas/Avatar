import React from 'react'
import { ProfileUpdate }  from '../../../declarations/Avatar_backend/Avatar_backend.did';
import { Form, TextField, TextArea, Button } from '@adobe/react-spectrum';

interface Props {
    submitCallback: (profile: ProfileUpdate) => void
}

class ProfileForm extends React.Component<Props> {
    state = {
        givenName: "",
        familyName: "",
        displayName: "",
        location: "",
        about: "",
    };

    constructor(props: Props) {
        super(props);
    }

    handleSubmit() {
        const { givenName, familyName, displayName, location, about } = this.state;
        const name = [givenName, familyName].join(" ");

        const profile : ProfileUpdate = {
            bio: {
                name: name ? [name] : [],
                givenName: givenName ? [givenName] : [],
                familyName: familyName ? [familyName] : [],
                about: about ? [about] : [],
                displayName: displayName ? [displayName] : [],
                location: location ? [location] : [],
             }
        }
        this.props.submitCallback(profile);
    }

    handleChange(key: string, value: string) {
        const newState: {[key: string]: string} = {};
        newState[key] = value;
        this.setState(newState);
    }

    render() {
        const { givenName, familyName, displayName, location, about } = this.state;
        const handleSubmit = this.handleSubmit.bind(this);
        const handleChange = this.handleChange.bind(this);

        return (
        <Form onSubmit={handleSubmit}>
            <TextField 
            label="First Name" 
            name="givenName" 
            value={givenName}
            onChange={(value) => handleChange("givenName", value)}
            />
            <TextField 
            label="Last Name" 
            name="familyName" 
            value={familyName}
            onChange={(value) => handleChange("familyName", value)}
            />
            <TextField 
            label="Display Name" 
            name="displayName" 
            value={displayName}
            onChange={(value) => handleChange("displayName", value)}
            />
            <TextField 
            label="Location" 
            name="location" 
            value={location}
            onChange={(value) => handleChange("location", value)}
            />  
            <TextArea 
            label="About" 
            name="about" 
            value={about}
            onChange={(value) => handleChange("about", value)}
            />   
            <Button 
            variant='primary' 
            onPress={handleSubmit}
            >
                Submit
            </Button>                      
        </Form>
      
        )}
}

export default ProfileForm;