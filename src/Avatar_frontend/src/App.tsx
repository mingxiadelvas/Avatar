import React, { useState, useEffect } from 'react';
import { Provider, defaultTheme, Flex } from '@adobe/react-spectrum';
import styled from 'styled-components';
import { AuthClient } from '@dfinity/auth-client';
import { ActorSubclass } from '@dfinity/agent';

import NotAuthenticated from './components/NotAuthenticated';
import Home from './components/Home';
import Loader from './components/Loader';
import { createActor } from '../../declarations/Avatar_frontend';
import { canisterId } from '../../declarations/Avatar_backend';
import { _SERVICE } from '../../declarations/Avatar_backend/Avatar_backend.did';

const Header = styled.header`
  position: relative;
  padding: 1rem;
  display: flex;
  justify-content: center;
  h1 {
    margin-top: 0;
  }
  #logout {
    position: absolute;
    right: 0.5rem;
    top: 0.5rem;
  }
`;

const Main = styled.main`
  display: flex;
  flex-direction: column;
  padding: 0 1rem;
`;

export const AppContext = React.createContext<{
    authClient?: AuthClient;
    setIsAuthenticated?: React.Dispatch<boolean>;
    actor?: ActorSubclass<_SERVICE> | undefined;
}>({})

const App = () => {
    const [authClient, setAuthClient] = useState<AuthClient | undefined>(undefined);
    const [actor, setActor] = useState<ActorSubclass<_SERVICE> | undefined>(undefined);
    const [isLoaded, setIsLoaded] = useState(false);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loadingMessage, setLoadingMessage] = useState("");

    useEffect(() => {
        //initialize AuthClient
        AuthClient.create().then(async (client) => {
            setAuthClient(client);
            setIsAuthenticated(await client.isAuthenticated());
            setIsLoaded(true);
        });
    }, [])

    useEffect(() => {
        if(!authClient) {
            return;
        } else {
            const identity = authClient.getIdentity();
            const actor = createActor(canisterId as string, {
                agentOptions: {
                    identity
                }
            }
        )}
        setActor(actor);
    }, [authClient])
    
    return (
        <Provider theme={defaultTheme}>
            <AppContext.Provider value={{ authClient, setIsAuthenticated, actor }}>
            <Main>
                <Header>
                    <h2>Avatar</h2>
                </Header>
                <Flex maxWidth={900} margin="1rem auto">
                    {!isAuthenticated && !loadingMessage ? (
                    <NotAuthenticated/> 
                    ) : (
                    <Home />
                    )}
                </Flex>
                {loadingMessage ? <Loader message={loadingMessage} /> : null}
            </Main>
            </AppContext.Provider>
        </Provider>
    );
};

export default App; 