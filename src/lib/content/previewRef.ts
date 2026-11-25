import { cookies, draftMode } from 'next/headers'

/** Cookie holding the content-repo branch a CMS preview was opened for. */
export const PREVIEW_REF_COOKIE = 'core_content_ref'

/** Branch/tag names only: no URL parts or path traversal. */
export const isValidContentRef = (ref: string): boolean =>
  /^[\w.\-/]{1,200}$/.test(ref) && !ref.includes('..') && !ref.startsWith('/')

/**
 * Content branch to read while an editor is previewing (Next draft mode), else undefined.
 * Outside a request (build time) or with draft mode off, normal visitors get `main`.
 */
export const getPreviewRef = async (): Promise<string | undefined> => {
  try {
    if (!(await draftMode()).isEnabled) {
      return undefined
    }

    const ref = (await cookies()).get(PREVIEW_REF_COOKIE)?.value
    return ref && isValidContentRef(ref) ? ref : undefined
  } catch {
    return undefined
  }
}
