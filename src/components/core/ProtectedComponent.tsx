import { useTranslation } from 'react-i18next';

import { useUserAuthContext } from '@/providers/UserAuthProvider';

export const ProtectedComponent = () => {
  const { isAuthenticated, connectedWallet } = useUserAuthContext();
  const { t } = useTranslation('translation');
  return (
    <div>
      {isAuthenticated ? t('welcome_message') + ` ${connectedWallet}` : ''}
    </div>
  );
};
