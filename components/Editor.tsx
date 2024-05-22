'use client';

import { useState } from 'react';
import { JournalEntry, Analysis } from '@prisma/client';
import { useAutosave } from 'react-autosave';
import updateEntry from '@/actions/updateEntry';

const Editor = ({ entry }: { entry: JournalEntry & { analysis: Analysis } }) => {
  const [value, setValue] = useState(entry.content);
  const [isLoading, setIsLoading] = useState(false);
  const [analysis, setAnalysis] = useState(entry.analysis);

  useAutosave({
    data: value,
    saveOnUnmount: false,
    onSave: async (_value) => {
      setIsLoading(true);
      const updatedEntry = await updateEntry(entry.id, _value);
      setAnalysis(updatedEntry.analysis);
      setIsLoading(false);
    },
  });

  const { summary, mood, negative, subject, color } = analysis;
  const analysisData = [
    { name: 'Summary', value: summary },
    { name: 'Subject', value: subject },
    { name: 'Mood', value: mood },
    { name: 'Negative', value: negative ? 'Yes' : 'No' },
  ];
  const moodColor = `after:bg-[${color}]`;

  return (
    <div className='grid grid-cols-1  sm:grid-cols-3 gap-4'>
      <div className='col-span-2'>
        {isLoading && <p>Saving...</p>}
        <textarea
          value={value}
          onChange={(e) => setValue(e.target.value)}
          className='w-full h-96 p-4 border border-gray-300 rounded-lg text-xl text-custom-green-3'
        />
      </div>
      <div>
        <div className='h-10 bg-blue-200' style={{ backgroundColor: `${color}` }}></div>
        <h2 className='p-2  text-2xl '>Analysis</h2>
        <ul>
          {analysisData.map((item) => {
            return (
              <li className='flex justify-between border-b border-black/10 p-2' key={item.name}>
                <span className='mr-2'>{item.name}</span>
                <span className='text-right'>{item.value}</span>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};
export default Editor;
