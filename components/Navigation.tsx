'use client';

import Link from 'next/link';

const links = [
  { href: '/', label: 'Home' },
  { href: '/journal', label: 'Journal' },
  { href: '/history', label: 'History' },
];

const Navigation = () => {
  return (
    <aside className='menu hidden  sm:block absolute sm:relative z-50 sm:z-0 bg-black  sm:bg-inherit w-screen sm:w-auto  sm:after:bg-custom-green-1 sm:after:w-0.5 sm:after:absolute sm:after:top-5 sm:after:bottom-5 after:right-0'>
      <button
        className='absolute sm:hidden right-6 top-3 stroke-custom-green-2 fill-custom-green-2 hover:stroke-custom-green-4 hover:fill-custom-green-4'
        onClick={() => document.querySelector('.menu')?.classList.toggle('hidden')}
      >
        <svg xmlns='http://www.w3.org/2000/svg' x='0px' y='0px' width='30' height='30' viewBox='0 0 50 50'>
          <path d='M 9.15625 6.3125 L 6.3125 9.15625 L 22.15625 25 L 6.21875 40.96875 L 9.03125 43.78125 L 25 27.84375 L 40.9375 43.78125 L 43.78125 40.9375 L 27.84375 25 L 43.6875 9.15625 L 40.84375 6.3125 L 25 22.15625 Z'></path>
        </svg>
      </button>
      <nav>
        <ul>
          {links.map((link) => (
            <li
              key={link.href}
              className='p-2 text-2xl'
              onClick={() => document.querySelector('.menu')?.classList.toggle('hidden')}
            >
              <Link href={link.href}>{link.label}</Link>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};

export default Navigation;
