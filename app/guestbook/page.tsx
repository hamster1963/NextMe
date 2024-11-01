import Form from './form'
import GuestbookEntries from './guestbook-entry'

export const metadata = {
  title: 'Guestbook',
  description: 'Sign my guestbook and leave your mark.',
}

export default function GuestbookPage() {
  return (
    <section className="sm:px-14 sm:pt-6">
      <h1 className="mb-2 text-2xl font-medium tracking-tighter">Guestbook</h1>
      <p className="prose prose-neutral mb-2 text-sm dark:prose-invert">
        Some text about the guestbook.
      </p>
      <GuestbookForm />
      <GuestbookEntries />
    </section>
  )
}

async function GuestbookForm() {
  return (
    <>
      <Form />
    </>
  )
}
