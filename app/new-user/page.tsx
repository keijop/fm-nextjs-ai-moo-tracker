import { prisma } from '@/utils/db';
import { currentUser } from '@clerk/nextjs';
import { redirect } from 'next/navigation';

const createNewUser = async () => {
  const clerkUser = await currentUser();

  const match = await prisma.user.findUnique({
    where: {
      clerkId: clerkUser?.id as string,
    },
  });

  if (!match) {
    await prisma.user.create({
      data: {
        clerkId: clerkUser?.id as string,
        email: clerkUser?.emailAddresses[0].emailAddress as string,
      },
    });
  }

  redirect('/journal');
};

const NewUserPage = async () => {
  await createNewUser();
  return <div></div>;
};

export default NewUserPage;
