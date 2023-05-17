import { FC, ReactNode } from 'react';

import AuroraAppBar from '@/components/core/AuroraAppBar';
import Body from '@/components/defaultLayout/Body';

type DefaultLayoutProps = {
  children: ReactNode;
};

const DefaultLayout: FC<DefaultLayoutProps> = ({ children }) => {
  return (
    <>
      <AuroraAppBar />
      <Body>{children}</Body>
    </>
  );
};

export default DefaultLayout;
