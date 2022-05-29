import React, { FC } from 'react';
import { Button, ButtonProps, styled } from '@mui/material';

interface IBtnProps extends ButtonProps {
  id?: string;
  children?: React.ReactNode;
  onClick?: (() => void) | ((e: React.MouseEvent<HTMLButtonElement>) => void);
  variant: 'contained' | 'outlined';
  className?: string;
  disabled?: boolean;
  href?: string;
}

const CustomButton: React.FC<IBtnProps> = ({
  id,
  children,
  onClick,
  variant,
  className,
  disabled,
  href,
}) => {
  return (
    <Button
      id={id}
      onClick={onClick}
      variant={variant}
      className={className}
      disabled={disabled}
      href={href}
    >
      {children}
    </Button>
  );
};

export default CustomButton;
