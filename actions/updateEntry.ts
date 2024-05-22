'use server';

import { analyze } from '@/utils/ai';
import { getUserByClerkId } from '@/utils/auth';
import { prisma } from '@/utils/db';
import { revalidatePath } from 'next/cache';

const updateEntry = async (id: string, content: string) => {
  const user = await getUserByClerkId();

  const updatedEntry = await prisma.journalEntry.update({
    where: {
      userId_id: {
        userId: user.id,
        id: id,
      },
    },
    data: {
      content,
    },
  });

  const updatedAnalysis = await prisma.analysis.update({
    where: {
      entryId: updatedEntry.id,
    },
    data: {
      userId: user.id,
      ...(await analyze(updatedEntry.content)),
    },
  });

  revalidatePath('/journal');
  return { ...updatedEntry, analysis: updatedAnalysis };
};

export default updateEntry;
