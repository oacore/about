const VIDEO_HOSTS = ['youtube.com', 'youtu.be', 'vimeo.com', 'drive.google.com'] as const

const getHost = (src: string): string | null => {
  try {
    return new URL(src).hostname.replace(/^www\./, '')
  } catch {
    return null
  }
}

export const isVideoPlatform = (src: string): boolean => {
  const host = getHost(src)

  if (!host) {
    return false
  }

  return VIDEO_HOSTS.some((item) => host === item || host.endsWith(`.${item}`))
}

export const getEmbedUrl = (src: string): string => {
  try {
    const url = new URL(src)
    const host = url.hostname.replace(/^www\./, '')

    if (host === 'youtu.be') {
      return `https://www.youtube.com/embed/${url.pathname.replace(/^\//, '')}`
    }

    if (host.endsWith('youtube.com')) {
      if (url.pathname.startsWith('/embed/')) {
        return src
      }

      const videoId = url.searchParams.get('v')
      if (videoId) {
        return `https://www.youtube.com/embed/${videoId}`
      }
    }

    if (host.endsWith('drive.google.com')) {
      const fileId = url.pathname.match(/\/file\/d\/([^/]+)/)?.[1]
      if (fileId) {
        return `https://drive.google.com/file/d/${fileId}/preview`
      }
    }

    if (host.endsWith('vimeo.com') && !url.pathname.startsWith('/video/')) {
      const videoId = url.pathname.split('/').filter(Boolean).pop()
      if (videoId) {
        return `https://player.vimeo.com/video/${videoId}`
      }
    }

    return src
  } catch {
    return src
  }
}
