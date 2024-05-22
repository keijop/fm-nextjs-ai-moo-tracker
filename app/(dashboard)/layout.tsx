import MenuButton from '@/components/MenuButton';
import Navigation from '@/components/Navigation';
import { UserButton } from '@clerk/nextjs';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  return (
    <main className='flex min-h-screen bg-white dark:bg-custom-black dark:text-custom-green-1'>
      <Navigation />
      <div className='flex flex-col flex-grow'>
        <header className='flex items-center p-5 relative after:bg-custom-green-1 after:left-5 after:right-5 after:absolute after:bottom-0 after:h-0.5'>
          <MenuButton />
          <div className=' ml-auto'>
            <UserButton />
          </div>
        </header>
        <div className='p-5 h-full'>
          <div className='w-full h-full'>{children}</div>
        </div>
      </div>
    </main>
  );
};

export default DashboardLayout;
