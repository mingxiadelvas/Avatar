import React, { useContext } from 'react'
import { Profile, ProfileUpdate } from '../../../declarations/Avatar_backend/Avatar_backend.did';
import { AppContext } from '../App';
import ProfileForm from './ProfileForm';

interface Props {
    setProfile: React.Dispatch<Profile>
}

function CreateProfile(props: Props) {
    const { actor } = useContext(AppContext);
    const submitCallback = async (profile: ProfileUpdate) => {
        await actor?.create(profile);
        const created = await actor?.read();
        if (created && "ok" in created) {
            props.setProfile(created.ok);
        }
    };
    
    return (
        <section>
            <h1>Create a new Avatar</h1>
            <ProfileForm submitCallback={ submitCallback }/>
        </section>
  )
}

export default CreateProfile