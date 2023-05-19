import Head from 'next/head';
import { useTranslation } from 'react-i18next';

import { useCallback } from 'react';

import { Button } from '@mui/material';

import { useAccount, useSignMessage } from 'wagmi';

export default function Home() {
  const { address } = useAccount();
  const { signMessageAsync } = useSignMessage();
  const { t, i18n } = useTranslation('translation');

  const signTransaction = async () => {
    const text = 'Tbo6NWxJKBx57CJ8oRb1';

    const response = await signMessageAsync({ message: text });
    console.log(`${text} was signed`);
    console.log(`${address} got signature ${response}`);
  };

  const issueTransactionSign = useCallback(signTransaction, [
    address,
    signMessageAsync,
  ]);

  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div>
        {t('welcome_message')} {i18n.language}
      </div>
      <Button onClick={issueTransactionSign}>Sign a Message!</Button>
    </>
  );
}
