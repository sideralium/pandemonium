import React from 'react';
import './button.scss';

export interface ButtonProps {
  primary?: boolean; // Is this the principal call to action on the page?
  backgroundColor?: string; // What background color to use
  size?: 'small' | 'medium' | 'large'; // How large should the button be?
  label: string; // Button contents
  onClick?: () => void; // Optional click handler
}

/** Primary UI component for user interaction */
export const Button: React.FC<ButtonProps> = ({
  primary = false,
  size = 'medium',
  backgroundColor,
  label,
  ...props
}) => {
  const mode = primary ? 'storybook-button--primary' : 'storybook-button--secondary';
  return (
    <a
      className={['storybook-button', `storybook-button--${size}`, mode, 'inner-shadows', 'accent-border'].join(' ')}
      style={{ backgroundColor }}
      {...props}
    >
      {label}
    </a>
  );
};
