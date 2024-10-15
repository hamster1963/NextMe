import { SkeletonBase } from '../../../components/skeleton-base'

export default function BlogLoading({ isDaily }: { isDaily: boolean }) {
  return (
    <div className="flex flex-col space-y-4">
      <SkeletonBase className="h-8 w-44" />
      <div className={'flex items-center justify-between'}>
        <SkeletonBase className="h-4 w-44" />
        <SkeletonBase className="h-4 w-16" />
      </div>
      {!isDaily && (
        <section>
          <SkeletonBase className="my-6 h-20 w-full rounded-xl" />
          <SkeletonBase className="z-50 h-64 w-full rounded-xl sm:my-20 sm:scale-150" />
        </section>
      )}

      <SkeletonBase className="h-5 w-full" />
      <SkeletonBase className="h-5 w-full" />
      <SkeletonBase className="h-5 w-full" />
      <SkeletonBase className="h-5 w-full" />
      <SkeletonBase className="h-5 w-full" />
      <SkeletonBase className="h-5 w-full" />
    </div>
  )
}
