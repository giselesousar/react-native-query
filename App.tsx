import React, {Fragment} from 'react';
import {StatusBar} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {QueryClient, QueryClientProvider} from 'react-query';

import {AppProviders} from './src/context';
import {Main} from './src/navigation/main';

const queryClient = new QueryClient();

const App = () => {
  return (
    <Fragment>
      <StatusBar barStyle={'light-content'} />
      <NavigationContainer>
        <AppProviders>
          <QueryClientProvider client={queryClient}>
            <Main />
          </QueryClientProvider>
        </AppProviders>
      </NavigationContainer>
    </Fragment>
  );
};

export default App;
