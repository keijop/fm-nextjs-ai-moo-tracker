import deleteEntry from '@/actions/deleteEntry';
import DeleteButton from '@/components/DeleteButton';
import Editor from '@/components/Editor';
import { getUserByClerkId } from '@/utils/auth';
import { prisma } from '@/utils/db';
import { Analysis, JournalEntry } from '@prisma/client';

const getEntry = async (id: string): Promise<(JournalEntry & { analysis: Analysis }) | null> => {
  const user = await getUserByClerkId();

  const entry = await prisma.journalEntry.findUnique({
    where: {
      userId_id: {
        userId: user.id,
        id,
      },
    },
    include: {
      analysis: true,
    },
  });

  if (!entry || !entry.analysis) {
    return null;
  }

  const analysis: Analysis = entry.analysis;

  const completeEntry: JournalEntry & { analysis: Analysis } = { ...entry, analysis };
  return completeEntry;
};

const EntryPage = async ({ params }: { params: { id: string } }) => {
  const entry = await getEntry(params.id);

  if (!entry) {
    return <p>Entry not found</p>;
  } else {
    return (
      <>
        <Editor entry={entry} />
        <form className='p-2' action={deleteEntry}>
          <label className='hidden' htmlFor='id'>
            Entry id
          </label>
          <input className='hidden' type='text' name='id' id='id' value={entry.id} readOnly />
          <DeleteButton />
        </form>
      </>
    );
  }
};

export default EntryPage;
