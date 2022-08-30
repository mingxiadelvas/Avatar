import React, { useState, useContext, useEffect } from 'react';
import { Profile } from '../../../declarations/Avatar_backend/Avatar_backend.did';
import { AppContext } from '../App';
import CreateProfile from './CreateProfile';

function Home() {
    const [profile, setProfile] = useState<Profile>();
    const [isLoaded, setIsLoaded] = useState(false);
    const { actor } = useContext(AppContext);

    useEffect(() => {
        actor?.read().then((result) => {
            if("ok" in result) {
                setProfile(result.ok);
            }
            setIsLoaded(true);
        });
    }, [actor]);

    return (
    <section> 
        Home
        {profile ? <></> : <CreateProfile setProfile={ setProfile } />}
    </section>
  );
}

export default Home;