import Link from 'next/link'
import Image from 'next/image'
import dialOne from 'public/work/boce/1.webp'
import dialTwo from 'public/work/boce/2.webp'
import dialThree from 'public/work/boce/3.webp'
import { BackIcon } from '../../../components/Icon'

export default function Page() {
  return (
    <section>
      <section className="sm:px-28 sm:pt-12">
        <h1 className="mb-2 text-2xl font-medium tracking-tighter transition-opacity hover:opacity-50">
          <Link href="/work" className="flex items-center justify-start">
            <BackIcon />
            Dial
          </Link>
        </h1>
        <p className="prose prose-neutral mb-6 text-sm dark:prose-invert">
          A dial test tool.
        </p>
        <p>
          一个用于测试站点在不同地区的访问情况的工具。 后端采用 Redis Stream
          实现，前端使用 Next.js 和 TypeScript 开发。
        </p>
        <blockquote className="my-6 border-l-2 pl-2 text-sm">
          <a href="https://boce.buycoffee.top" target={'_blank'}>
            https://boce.buycoffee.top
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
              Backend
            </div>
            <div className={'text-md flex items-center'}>
              <img
                alt="Go logomark"
                src="/golang.svg"
                className="!mr-1"
                width="20"
                height="20"
              />
              Go / Goframe
            </div>
          </section>
          <section className={'flex items-center justify-between'}>
            <div className={'font-md text-neutral-600 dark:text-neutral-400'}>
              Database
            </div>
            <div className={'text-md flex items-center'}>
              <img
                alt="Redis logomark"
                src="/redis.svg"
                className="!mr-1"
                width="20"
                height="20"
              />
              Redis
            </div>
          </section>
        </div>
      </section>
      <Image
        placeholder="blur"
        className={'mt-10 md:mt-40 md:scale-150'}
        alt={'Hamster1963'}
        src={dialOne}
      />
      <Image
        placeholder="blur"
        className={'mt-5 md:mt-72 md:scale-150'}
        alt={'Hamster1963'}
        src={dialTwo}
      />
      <Image
        placeholder="blur"
        className={'mt-5 md:mb-56 md:mt-96 md:scale-150'}
        alt={'Hamster1963'}
        src={dialThree}
      />
    </section>
  )
}
