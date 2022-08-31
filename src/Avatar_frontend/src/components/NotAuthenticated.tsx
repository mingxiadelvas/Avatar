import React, { useContext } from 'react';
import styled from 'styled-components';
import { AppContext } from '../App';
import { Button } from '@adobe/react-spectrum';

const Section = styled.section`
    witdth: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    `;

function NotAuthenticated(){
    const { authClient, setIsAuthenticated } = useContext(AppContext);
    
    return (
        <Section>
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
        </Section>
    )
}

export default NotAuthenticated; 