'use client';

import { askQuestion } from '@/utils/api';
import { SetStateAction, useState } from 'react';

const Question = () => {
  const [value, setValue] = useState('');
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState('');

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => setValue(e.target.value);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const answer = await askQuestion(value);
    setResponse(answer);
    setLoading(false);
  };

  return (
    <div className='border border-custom-green-1 rounded-lg p-2'>
      <form onSubmit={onSubmit}>
        <label htmlFor='text' className='text-lg'>
          Ask about mood:
        </label>
        <input
          disabled={loading}
          type='textarea'
          name='text'
          id='text'
          value={value}
          onChange={onChange}
          className='p-2 mr-2 mt-2 rounded w-[100%] text-custom-black'
        />
        <button
          disabled={loading}
          type='submit'
          className='p-2 mt-4 rounded bg-custom-green-2 text-custom-green-3 hover:bg-custom-green-4'
        >
          Submit
        </button>
      </form>
      {loading && <p>Loading...</p>}
      {response && <p>{response}</p>}
    </div>
  );
};

export default Question;
