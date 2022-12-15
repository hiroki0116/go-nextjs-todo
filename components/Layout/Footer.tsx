import Link from 'next/link';

const Footer = () => {
  return (
    <footer className='relative text-center'>
        <div className="fixed bottom-3 left-0 right-0 flex flex-row gap-1 justify-center">
          <Link href="https://60s-idea-training.vercel.app/about" className='tracking-tight text-primary font-bold bg-white/20 px-2 rounded'>About Developer</Link>
          <div className='italic'>© 2022, TaskGO.</div>
        </div>
    </footer>
  )
}

export default Footer