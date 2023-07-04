import { FC } from 'react';

import { Button, ButtonProps } from '@mui/material';

type BatchButtonProps = ButtonProps & {
  label: string;
  action: () => void;
};

export const BatchButton: FC<BatchButtonProps> = (props) => {
  const { action, label, ...other } = props;

  return (
    <Button
      onClick={action}
      {...other}
      variant="contained"
      sx={{
        marginBottom: '-30px',
        color: 'white',
        backgroundColor: 'rgb(100, 0, 9)',
        ':hover': {
          backgroundColor: 'rgb(80, 0, 9)',
        },
        borderRadius: '9px',
      }}
    >
      {label}
    </Button>
  );
};
