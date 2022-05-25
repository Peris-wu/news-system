import { lazy, Suspense } from 'react'

export default function LazyLoad(pathname) {
  const Comp = lazy(() => import(`../${pathname}`))
  return (
    <Suspense fallback={<div>loading</div>}>
      <Comp></Comp>
    </Suspense>
  )
}
