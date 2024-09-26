import { SignIn } from '@clerk/nextjs'

export default function Page() {
  return(
    <div className='relative pt-12 lg:pt-16 flex items-center justify-center'>
      <SignIn />
    </div>
  ) 
}