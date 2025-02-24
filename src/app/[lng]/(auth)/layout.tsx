import ThirdFooter from '@/components/modules/footer/ThirdFooter'
import AuthHeader from '@/components/modules/header/AuthHeader'

export default async function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className='flex flex-col h-screen'>
      <AuthHeader />
      {children}
      <ThirdFooter />
    </div>
  )
}
