'use client'


import { motion } from 'framer-motion'
import { SkeletonBase } from '../components/skeleton-base'

export default function GuestbookEntries() {
  const entries = [
    {
      "id": 95,
      "body": "👌前端部分将会加入到博客框架中。",
      "created_by": "仓鼠",
      "created_at": "2024-11-01 09:46:41",
      "updated_at": "2024-11-01 09:46:52",
      "is_reply": 2,
      "reply_to": 94,
      "slug": "guestbook",
      "is_banner": 2,
      "banner_url": ""
    },
    {
      "id": 94,
      "body": "大佬评论页有打算开源吗😘",
      "created_by": "pangxf",
      "created_at": "2024-11-01 09:42:22",
      "updated_at": "2024-11-01 09:42:22",
      "is_reply": 1,
      "reply_to": 0,
      "slug": "guestbook",
      "is_banner": 2,
      "banner_url": ""
    },
    {
      "id": 84,
      "body": "也没有...您可以在这里https://buycoffee.top/coffee找到赞赏与联系方式。",
      "created_by": "仓鼠",
      "created_at": "2024-10-23 01:09:36",
      "updated_at": "2024-10-23 01:09:47",
      "is_reply": 2,
      "reply_to": 83,
      "slug": "guestbook",
      "is_banner": 2,
      "banner_url": ""
    },
    {
      "id": 83,
      "body": "额我是说你有群什么的吗？",
      "created_by": "dodo",
      "created_at": "2024-10-22 16:45:03",
      "updated_at": "2024-10-22 16:45:03",
      "is_reply": 1,
      "reply_to": 0,
      "slug": "guestbook",
      "is_banner": 2,
      "banner_url": ""
    },
    {
      "id": 82,
      "body": "没有，都是深夜里慢慢磨...",
      "created_by": "仓鼠",
      "created_at": "2024-10-22 16:17:42",
      "updated_at": "2024-10-22 16:17:50",
      "is_reply": 2,
      "reply_to": 81,
      "slug": "guestbook",
      "is_banner": 2,
      "banner_url": ""
    },
    {
      "id": 81,
      "body": "有组织吗？这风格一眼爱了必须赞赏。",
      "created_by": "dodo",
      "created_at": "2024-10-22 16:09:07",
      "updated_at": "2024-10-22 16:09:07",
      "is_reply": 1,
      "reply_to": 0,
      "slug": "guestbook",
      "is_banner": 2,
      "banner_url": ""
    }]

  if (!entries || entries.length === 0) {
    return (
      <>
        <div className="flex flex-col">
          <SkeletonBase className="h-5 w-52" />
          <SkeletonBase className="mt-5 h-5 w-52" />
          <SkeletonBase className="mt-5 h-5 w-32" />
          <SkeletonBase className="mt-5 h-5 w-32" />
          <SkeletonBase className="mt-5 h-5 w-52" />
          <SkeletonBase className="mt-5 h-5 w-52" />
          <SkeletonBase className="mt-5 h-5 w-32" />
        </div>
      </>
    )
  }

  const guestbooks = entries.filter((entry) => entry.is_reply === 1)
  const replies = entries.filter((entry) => entry.is_reply === 2)

  return guestbooks?.map((entry, index) => {
    const reply = replies.find((reply) => reply.reply_to === entry.id)

    if (entry.is_banner === 1) {
      return (
        <motion.div
          key={entry.id}
          initial={{ opacity: 0, filter: 'blur(10px)' }}
          animate={{ opacity: 1, filter: 'blur(0px)' }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          className="mb-4 flex w-full flex-col items-center"
        >
          <a
            target="_blank"
            href={entry.banner_url}
            className="rounded-lg bg-blue-700 px-2 py-1 text-xs font-semibold text-white shadow-lg shadow-blue-700/20 transition-shadow duration-300 hover:shadow-none dark:shadow-none"
          >
            {entry.body}
          </a>
        </motion.div>
      )
    }

    return (
      <motion.div
        key={entry.id}
        initial={{ opacity: 0, filter: 'blur(10px)' }}
        animate={{ opacity: 1, filter: 'blur(0px)' }}
        transition={{ duration: 0.5, delay: index * 0.1 }}
        className="mb-4 flex flex-col"
      >
        <div className="w-full break-words text-sm">
          <span className="mr-1 text-neutral-600 dark:text-neutral-400">
            {entry.created_by}:
          </span>
          {entry.body}
        </div>
        {reply && (
          <motion.div
            initial={{ opacity: 0, filter: 'blur(10px)', y: 20 }}
            animate={{ opacity: 1, filter: 'blur(0px)', y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.3 + 0.1 }}
            className="flex justify-end"
          >
            <div className="mt-3 max-w-[90%] rounded-lg bg-neutral-100 p-2 text-left text-xs text-neutral-800 dark:bg-neutral-800 dark:text-neutral-400">
              {reply.body}
            </div>
          </motion.div>
        )}
      </motion.div>
    )
  })
}
