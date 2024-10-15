'use client'

import { motion } from 'framer-motion'
import WorkCard from './work-card'
import homedash from 'public/work/home-new.webp'
import boce from 'public/work/boce.webp'
import order from 'public/work/order.webp'
import music from 'public/work/music.webp'
import poc from 'public/work/poc.webp'
import it from 'public/work/it.webp'
import letter from 'public/work/letter.webp'
import chat from 'public/work/chat.webp'

const container = {
  hidden: { opacity: 1 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
}

const item = {
  hidden: { filter: 'blur(20px)', opacity: 0 },
  visible: {
    filter: 'blur(0px)',
    opacity: 1,
    transition: {
      duration: 0.5,
    },
  },
}

export default async function Page() {
  return (
    <section>
      <section className="sm:px-14 sm:pt-6">
        <h1 className="mb-2 text-2xl font-medium tracking-tighter">
          Selected works
        </h1>
        <p className="prose prose-neutral mb-6 text-sm dark:prose-invert">
          Some projects that might be interesting.
        </p>
        <motion.div variants={container} initial="hidden" animate="visible">
          <motion.div variants={item}>
            <WorkCard
              title={'HomeDash'}
              description={'A dashboard for home.'}
              image={homedash}
              link={'/work/homedash'}
            />
          </motion.div>
          <motion.section className={'grid grid-cols-1 gap-4 sm:grid-cols-2'}>
            <motion.div variants={item}>
              <WorkCard
                title={'Chat'}
                description={'Chat with AI.'}
                image={chat}
                link={'/work/chat'}
              />
            </motion.div>
            <motion.div variants={item}>
              <WorkCard
                title={'PoC'}
                description={'Just a PoC.'}
                image={poc}
                link={'/work/poc'}
              />
            </motion.div>
            <motion.div variants={item}>
              <WorkCard
                title={'Letter'}
                description={'Write letters.'}
                image={letter}
                link={'/work/letter'}
              />
            </motion.div>

            <motion.div variants={item}>
              <WorkCard
                title={'Dial'}
                description={'A dial test tool.'}
                image={boce}
                link={'/work/dial'}
              />
            </motion.div>
            <motion.div variants={item}>
              <WorkCard
                title={'Order'}
                description={'KES order system.'}
                image={order}
                link={'/work/order'}
              />
            </motion.div>
            <motion.div variants={item}>
              <WorkCard
                title={'Tiny-Music'}
                description={'A music component.'}
                image={music}
                link={'/work/music'}
              />
            </motion.div>
            <motion.div variants={item}>
              <WorkCard
                title={'KES-IT'}
                description={'Network monitoring.'}
                image={it}
                link={'/work/it'}
              />
            </motion.div>
          </motion.section>
        </motion.div>
      </section>
    </section>
  )
}
