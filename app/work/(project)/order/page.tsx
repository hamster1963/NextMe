import Link from 'next/link'
import Image from 'next/image'
import orderOne from 'public/work/order/1.webp'
import orderTwo from 'public/work/order/2.webp'
import { BackIcon } from '../../../components/Icon'

export default function Page() {
  return (
    <section>
      <section className="sm:px-28 sm:pt-12">
        <h1 className="mb-2 text-2xl font-medium tracking-tighter transition-opacity hover:opacity-50">
          <Link href="/work" className="flex items-center justify-start">
            <BackIcon />
            Order
          </Link>
        </h1>
        <p className="prose prose-neutral mb-6 text-sm dark:prose-invert">
          KES order system.
        </p>
        <p>一个订餐系统。</p>
        <div
          className={
            'my-4 w-full border-t border-dashed border-neutral-200 dark:border-neutral-700'
          }
        />
        <h2 className="text-md mb-4 font-medium tracking-tighter">项目信息</h2>
        <div
          className={
            'flex w-full flex-col gap-6 rounded-lg bg-neutral-100 p-6 dark:bg-neutral-800'
          }
        >
          <section className={'flex items-center justify-between'}>
            <div className={'font-md text-neutral-600 dark:text-neutral-400'}>
              Frontend
            </div>
            <div className={'text-md flex items-center'}>
              <picture>
                <img
                  alt="Next.js logomark"
                  src="/next-logo.svg"
                  className="!mr-1"
                  width="20"
                  height="20"
                />
              </picture>
              Next.js
            </div>
          </section>
          <section className={'flex items-center justify-between'}>
            <div className={'font-md text-neutral-600 dark:text-neutral-400'}>
              UI
            </div>
            <div className={'text-md flex items-center'}>
              <picture>
                <img
                  alt="semi logomark"
                  src="/semi.svg"
                  className="!mr-1 dark:hidden"
                  width="20"
                  height="20"
                />
                <img
                  alt="semi logomark"
                  src="/semi-dark.svg"
                  className="!mr-1 hidden dark:block"
                  width="20"
                  height="20"
                />
              </picture>
              Semi
            </div>
          </section>

          <section className={'flex items-center justify-between'}>
            <div className={'font-md text-neutral-600 dark:text-neutral-400'}>
              Backend
            </div>
            <div className={'text-md flex items-center'}>
              <picture>
                <img
                  alt="Go logomark"
                  src="/golang.svg"
                  className="!mr-1"
                  width="20"
                  height="20"
                />
              </picture>
              Go / Goframe
            </div>
          </section>
          <section className={'flex items-center justify-between'}>
            <div className={'font-md text-neutral-600 dark:text-neutral-400'}>
              Database
            </div>
            <div className={'text-md flex items-center'}>
              <picture>
                <img
                  alt="mysql logomark"
                  src="/mysql.svg"
                  className="!mr-1"
                  width="20"
                  height="20"
                />
              </picture>
              MySQL
            </div>
          </section>
        </div>
      </section>
      <Image
        placeholder="blur"
        className={'mt-10'}
        alt={'Hamster1963'}
        src={orderOne}
      />
      <Image
        placeholder="blur"
        className={'mt-5'}
        alt={'Hamster1963'}
        src={orderTwo}
      />
    </section>
  )
}
