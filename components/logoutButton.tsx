'use client';

import { Loader, LogOut } from 'lucide-react';
import React from 'react';
import { useFormStatus } from 'react-dom';

export default function LogoutButton(
  props: React.ButtonHTMLAttributes<HTMLButtonElement>,
) {
  const { pending } = useFormStatus();

  return (
    <button {...props} type="submit" disabled={pending} className="flex grow">
      <span className="flex items-center justify-center gap-1">
        <LogOut className="mr-2 h-4 w-4" />
        <span>Logout</span>
        {pending && <Loader size={16} className="animate-spin" />}
      </span>
    </button>
  );
}
