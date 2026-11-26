import { cookies, draftMode } from 'next/headers'
import { redirect } from 'next/navigation'
import { NextResponse, type NextRequest } from 'next/server'

import { PREVIEW_REF_COOKIE, isValidContentRef } from '@/lib/content/previewRef'
import { contentRefExists } from '@/lib/content/retrieveContent'

/**
 * Netlify CMS "View live" (preview_path in public/netlify-cms.config.yml):
 *   /api/preview?page=<relative path>&ref=<content branch>
 * Shows `page` with content from `ref` (Next draft mode), like the old pages/api/preview.js.
 */
export const GET = async (request: NextRequest) => {
  const page = request.nextUrl.searchParams.get('page')
  const ref = request.nextUrl.searchParams.get('ref')

  if (!page || !ref) {
    return NextResponse.json(
      { message: "Both parameters, 'page' and 'ref' must be sent" },
      { status: 401 },
    )
  }

  // Only paths on this site: resolve against a placeholder host and reject anything that leaves it
  const target = new URL(page, 'https://preview.invalid')

  if (target.host !== 'preview.invalid') {
    return NextResponse.json(
      { message: "Target 'page' origin doesn't match current origin. Please, use relative URLs instead" },
      { status: 400 },
    )
  }

  // An unknown branch would break the preview; as before, still redirect so "View live" works
  if (isValidContentRef(ref) && (await contentRefExists(ref))) {
    ;(await draftMode()).enable()
    ;(await cookies()).set(PREVIEW_REF_COOKIE, ref, {
      httpOnly: true,
      path: '/',
      sameSite: 'lax',
      secure: process.env.NODE_ENV === 'production',
    })
  }

  redirect(`${target.pathname}${target.search}${target.hash}`)
}
