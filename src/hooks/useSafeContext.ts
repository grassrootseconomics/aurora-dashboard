import { Context, useContext } from 'react';

export const useSafeContext = <T extends Context<any>>(
  context: T
): T extends Context<infer U> ? NonNullable<U> : unknown => {
  // eslint-disable-next-line
  const contextValue = useContext(context);

  if (contextValue === null || contextValue === undefined) {
    throw new Error(`useSafeContext: ${context.displayName!} is not available`);
  }

  return contextValue;
};
