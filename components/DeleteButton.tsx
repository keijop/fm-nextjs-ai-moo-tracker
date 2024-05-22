'use client';

import { useFormStatus } from 'react-dom';

const DeleteButton = () => {
  const status = useFormStatus();

  return (
    <button
      disabled={status.pending}
      type='submit'
      className={`p-4 mt-4 rounded bg-custom-red-1 text-white hover:bg-custom-red-2 ${
        status.pending ? 'opacity-50' : ''
      }`}
    >
      DELETE ENTRY
    </button>
  );
};

export default DeleteButton;
