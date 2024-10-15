import React from 'react'

type tech = {
  category: string
  tech: string
}

type TechCardProps = {
  techList: tech[]
}

export default function TechCard({ techList }: TechCardProps) {
  return (
    <>
      <h2 className="mb-4 text-[18px] font-medium tracking-tighter">
        Project Tech
      </h2>
      <div
        className={
          'flex w-full flex-col gap-6 rounded-lg bg-neutral-100 p-6 dark:bg-neutral-800'
        }
      >
        {techList.map((tech) => (
          <section
            key={tech.tech}
            className={'flex items-center justify-between'}
          >
            <div className={'font-md text-neutral-600 dark:text-neutral-400'}>
              {tech.category}
            </div>
            <div className={'text-md flex items-center font-normal'}>
              {tech.tech}
            </div>
          </section>
        ))}
      </div>
    </>
  )
}
