import AccountActions from '@/components/pages/AuthPage/components/AccountActions'
import AuthCard from '@/components/pages/AuthPage/components/AuthCard'
import SigninForm from '@/components/pages/AuthPage/SigninForm'
import BackButton from '@/components/shared/BackButton'
import { Container } from '@/components/shared/Container'

export default async function SigninPage() {
  return (
    <main role='main' className='grow bg-grayy dark:bg-dark_bg'>
      <section className='py-4 tablet:pb-7 tablet:pt-4 laptop:pt-28 laptop:pb-28'>
        <Container size='s' className='flex flex-col items-start justify-center'>
          <div className='mb-4 laptop:mb-8'>
            <BackButton />
          </div>

          <AuthCard
            headerLabel={'signinTitle'}
            backButtonHref='/signup'
            backButtonLabel='authCreateAccount'
          >
            <SigninForm />
          </AuthCard>
          <div className='block mt-6 tablet:hidden'>
            <AccountActions />
          </div>
        </Container>
      </section>
    </main>
  )
}
