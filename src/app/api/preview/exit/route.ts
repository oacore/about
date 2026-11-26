import { cookies, draftMode } from 'next/headers'
import { redirect } from 'next/navigation'
import type { NextRequest } from 'next/server'

import { PREVIEW_REF_COOKIE } from '@/lib/content/previewRef'

/** Leaves CMS preview: /api/preview/exit?page=<relative path> (defaults to the home page). */
export const GET = async (request: NextRequest) => {
  ;(await draftMode()).disable()
  ;(await cookies()).delete(PREVIEW_REF_COOKIE)

  const page = request.nextUrl.searchParams.get('page') ?? '/'
  const target = new URL(page, 'https://preview.invalid')

  redirect(target.host === 'preview.invalid' ? `${target.pathname}${target.search}` : '/')
}
