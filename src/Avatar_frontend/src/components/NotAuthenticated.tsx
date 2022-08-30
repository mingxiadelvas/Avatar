import React, { useContext } from 'react';
import { AppContext } from '../App';
import { Button } from '@adobe/react-spectrum';

function NotAuthenticated(){
    const { authClient, setIsAuthenticated } = useContext(AppContext);
    
    return (
        <section>
            <h1>You are mot authenticated</h1>
            <Button 
            variant='cta' 
            onPress={async () => {
                await authClient?.login({
                    identityProvider: process.env.II_URL,
                });
                setIsAuthenticated?.(true);
            }}
            >
                Login with II
            </Button>
        </section>
    )
}

export default NotAuthenticated; 