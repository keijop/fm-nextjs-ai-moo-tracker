'use server';

import { getUserByClerkId } from '@/utils/auth';
import { prisma } from '@/utils/db';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

const deleteEntry = async (formData: FormData) => {
  const user = await getUserByClerkId();
  const entryId = formData.get('id');

  if (typeof entryId === 'string') {
    const res = await prisma.journalEntry.delete({
      where: {
        userId: user.id,
        id: entryId,
      },
    });

    console.log(res);
    revalidatePath('/journal');
    redirect('/journal');
    return res;
  }
};

export default deleteEntry;
