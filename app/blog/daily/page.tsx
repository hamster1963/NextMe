import DailyList from './daily-list'
import TypeSwitch from '../type-switch'

export const metadata = {
  title: 'Daily',
  description:
    'Read my daily thoughts on software development, design, and more.',
}

export default async function Page() {
  return (
    <section className="sm:px-14 sm:pt-6">
      <h1 className="mb-2 text-2xl font-medium tracking-tighter">Daily</h1>
      <p className="prose prose-neutral mb-2 text-sm dark:prose-invert">
        Some thoughts.
      </p>
      <TypeSwitch />
      <DailyList />
    </section>
  )
}
