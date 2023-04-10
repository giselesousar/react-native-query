import React, { ReactNode } from 'react';

import { FakeApiProvider } from './fakeApi';

interface Props {
  children: ReactNode;
}

const AppProviders = ({ children }: Props): JSX.Element => <FakeApiProvider>{children}</FakeApiProvider>;

export default AppProviders;