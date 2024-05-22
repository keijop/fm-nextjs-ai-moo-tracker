import Chart from '@/components/Chart';
import PageHeading from '@/components/PageHeading';
import { getUserByClerkId } from '@/utils/auth';
import { prisma } from '@/utils/db';

const getSentimentData = async () => {
  const user = await getUserByClerkId();
  const analysis = await prisma.analysis.findMany({
    where: {
      userId: user.id,
    },
    orderBy: {
      createdAt: 'asc',
    },
  });

  const sentimentScoreSum = analysis.reduce((acc, curr) => acc + curr.sentimentScore, 0);
  const averageSentimentScore = Math.round(sentimentScoreSum / analysis.length);
  return { averageSentimentScore, analysis };
};

const History = async () => {
  const { averageSentimentScore, analysis } = await getSentimentData();

  return (
    <div className='w-full h-full'>
      <PageHeading title='History' />
      Average sentiment score: {averageSentimentScore}
      <Chart analysis={analysis} />
    </div>
  );
};

export default History;
