import { Container } from "@/components/shared/Container";
import FooterContacts from "@/components/shared/FooterContacts";
import FooterLinksList from "@/components/shared/FooterLinksList";
 
import Logo from "@/components/shared/Logo";
import { footerNavLinks } from "@/constans/constans.footerNavLinks";
 
import Link from "next/link";

export default async function MainFooter() {
  return (
    <footer role='footer' className='w-full py-6 laptop:py-8'>
      <Container size='m'>
        <ul className='grid grid-cols-2 gap-x-[17px] gap-y-[32px] gap-4 tablet:grid-cols-3 laptop:grid-cols-4 laptop:gap-[114px] pb-8'>
          <li>
            <h5 className='mb-4 h5 text-text_prymery_color '>For passengers</h5>
            <FooterLinksList navLinks={footerNavLinks['passengers']} />
          </li>
          <li>
            <h5 className='mb-4 h5 text-text_prymery_color '>For employees</h5>
            <FooterLinksList navLinks={footerNavLinks['employees']} />
          </li>

          <li className='col-span-2 tablet:col-span-1'>
            <ul className='flex flex-col size-full'>
              <li>
                <h5 className='mb-4 h5 text-text_prymery_color '>Contacts</h5>
                <ul>
                  <li className='mb-2'>
                    <FooterContacts />
                  </li>

                  <li>
                    <Link
                      href={'mailto:greenbus@gmail.com'}
                      target='_blank'
                      aria-label='greenbus@gmail.com'
                      className='block secondary_text tablet:main_text_body text-text_secondary_color'
                    >
                      greenbus@gmail.com
                    </Link>
                  </li>
                </ul>
              </li>
              <li className='my-8 laptop:hidden tablet:my-0 tablet:mt-auto'>
                <FooterLinksList
                  navLinks={footerNavLinks['social']}
                  className='flex flex-row gap-4 '
                />
              </li>
            </ul>
          </li>
          <li className='hidden laptop:block'>
            <h4 className='mb-4 text-base font-bold tablet:text-lg text-black_2_for_text dark:text-grayy'>
              Follow us
            </h4>
            <FooterLinksList navLinks={footerNavLinks['social']} className='flex flex-row gap-2' />
          </li>
        </ul>

        <ul className='flex flex-col tablet:flex-row gap-6 laptop:gap-[84px] tablet:grid-cols-2 tablet:items-center border-t-[1px] border-gray_light pt-8 pb-6'>
          <li className='tablet:order-last'>
            <FooterLinksList
              navLinks={footerNavLinks['documents']}
              className='flex flex-row items-center justify-between tablet:justify-normal'
            />
          </li>
          <li className='tablet:row-start-1 tablet:col-start-1'>
            <Logo />
          </li>
        </ul>
      </Container>
    </footer>
  );
}
