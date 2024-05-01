import { Loader } from 'lucide-react';
import React from 'react';
import { Button } from './ui/button';

type LoadingButtonProps = {
  loading: boolean;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

export default function LoadingButton({
  children,
  loading,
  ...props
}: LoadingButtonProps) {
  return (
    <Button {...props} disabled={props.disabled || loading}>
      <span className="flex items-center justify-center gap-1">
        {children}
        {loading && <Loader size={16} className="animate-spin" />}
      </span>
    </Button>
  );
}
