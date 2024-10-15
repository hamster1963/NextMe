import Link from 'next/link'
import Image from 'next/image'
import musicOne from 'public/work/music/1.webp'
import musicTwo from 'public/work/music/2.webp'
import { BackIcon } from '../../../components/Icon'

export default function Page() {
  return (
    <section>
      <section className="sm:px-28 sm:pt-12">
        <h1 className="mb-2 text-2xl font-medium tracking-tighter transition-opacity hover:opacity-50">
          <Link href="/work" className="flex items-center justify-start">
            <BackIcon />
            Tiny-Music
          </Link>
        </h1>
        <p className="prose prose-neutral mb-6 text-sm dark:prose-invert">
          A music component.
        </p>
        <p>
          A fresh, minimalist, and visually appealing music status display
          component, featuring a ready-to-use copy-paste mode, brought to you by
          Hamster.
        </p>
        <blockquote className="my-6 border-l-2 pl-2 text-sm">
          <a href="https://next-tiny-music.buycoffee.top/" target={'_blank'}>
            https://next-tiny-music.buycoffee.top
          </a>
        </blockquote>
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
              <img
                alt="Next.js logomark"
                src="/next-logo.svg"
                className="!mr-1"
                width="20"
                height="20"
              />
              Next.js
            </div>
          </section>
          <section className={'flex items-center justify-between'}>
            <div className={'font-md text-neutral-600 dark:text-neutral-400'}>
              UI
            </div>
            <div className={'text-md flex items-center'}>Shadcn/ui</div>
          </section>
        </div>
      </section>
      <Image
        placeholder="blur"
        className={'mt-10'}
        alt={'Hamster1963'}
        src={musicOne}
      />
      <Image
        placeholder="blur"
        className={'mt-5'}
        alt={'Hamster1963'}
        src={musicTwo}
      />
    </section>
  )
}
