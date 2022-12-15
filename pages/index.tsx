import Image from 'next/image';

const fileUrl = "https://res.cloudinary.com/sixty-seconds-idea-training-project/image/upload/v1671031763/ApplicationLayout/terminal_f0ndac.gif";
export default function Home() {
  return (
    <div className="flex justify-center mx-5">
      <Image src={fileUrl} width={650} height={500} alt="termianlgif" className='shadow-2xl rounded' priority/>
    </div>
  )
}
