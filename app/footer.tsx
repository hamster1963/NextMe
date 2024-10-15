export default function Footer() {
  return (
    <footer className="pt-20 sm:px-14">
      <section className="flex flex-col">
        <p className="mt-1 flex gap-1 text-[13px] font-light tracking-tight text-neutral-600/50 dark:text-neutral-300/50">
          Built with{' '}
          <a
            href="https://nextjs.org"
            className="cursor-pointer font-normal underline decoration-yellow-500 decoration-2 underline-offset-2 dark:decoration-yellow-500/50"
          >
            Next.js
          </a>
        </p>
        <section className="mt-1 flex items-center gap-2 text-[13px] font-light tracking-tight text-neutral-600/50 dark:text-neutral-300/50">
          © 2021-{new Date().getFullYear()}{' '}
          <a href={'https://github.com/hamster1963'}>@Hamster1963</a>
        </section>
      </section>
    </footer>
  )
}
