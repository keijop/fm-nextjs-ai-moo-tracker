import EntryCard from '@/components/EntryCard';
import NewEntryCard from '@/components/NewEntryCard';
import PageHeading from '@/components/PageHeading';
import Question from '@/components/Question';
import { getUserByClerkId } from '@/utils/auth';
import { prisma } from '@/utils/db';
import { Analysis, JournalEntry } from '@prisma/client';
import Link from 'next/link';

const getEntries = async () => {
  const user = await getUserByClerkId();

  const entries = await prisma.journalEntry.findMany({
    where: {
      userId: user.id,
    },
    orderBy: {
      createdAt: 'desc',
    },
    include: {
      analysis: true,
    },
  });

  const isNonNull = <T,>(value: T | null): value is T => value !== null;

  const entriesWithAnalysis = entries
    .map((entry) => {
      if (!entry || !entry.analysis) {
        return null;
      }

      const analysis: Analysis = entry.analysis;

      const completeEntry: JournalEntry & { analysis: Analysis } = { ...entry, analysis };
      return completeEntry;
    })
    .filter(isNonNull);

  return entriesWithAnalysis;
};

const Journal = async () => {
  const entries = await getEntries();

  return (
    <>
      <PageHeading title='Journal' />
      <div className='grid grid-cols-1 sm:grid-cols-3 gap-4'>
        <Question />
        <NewEntryCard />
        {entries.map((entry) => (
          <Link href={`/journal/${entry.id}`} key={entry.id}>
            <EntryCard entry={entry} />
          </Link>
        ))}
      </div>
    </>
  );
};

export default Journal;
