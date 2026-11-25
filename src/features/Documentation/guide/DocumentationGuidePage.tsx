'use client'

import { Layout, VideoModal, type VideoModalVideo } from '@core/core-ui'
import { MenuUnfoldOutlined, VideoCameraFilled } from '@ant-design/icons'
import { Button, Drawer, FloatButton, Layout as AntLayout, Typography } from 'antd'
import { usePathname, useRouter } from 'next/navigation'
import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type RefObject,
} from 'react'

import DocsNav from './components/DocsNav'
import DocsSection from './components/DocsSection'
import DocsToggler from './components/DocsToggler'
import { DOCUMENTATION_SWITCHER_OPTIONS, DOCUMENTATION_SWITCHER_TITLES } from './constants'
import type { DocsTutorial, DocumentationGuidePageProps } from './types'
import { resolveSectionId } from './utils'
import { getEmbedUrl, isVideoPlatform } from './video'

import styles from './styles.module.css'

/** Sticky site header height (SiteFrame). */
const SITE_HEADER_HEIGHT = 64
/** Gap left above a section heading once it is scrolled to. */
const SECTION_GAP = 24
/** Toggler bar height before measuring (desktop). */
const DEFAULT_STICKY_HEIGHT = 54

const toVideo = (tutorial: DocsTutorial): VideoModalVideo => ({
  src: isVideoPlatform(tutorial.src) ? getEmbedUrl(tutorial.src) : tutorial.src,
  title: tutorial.title || tutorial.text,
})

const scrollToSection = (id: string, offset: number) => {
  const element = document.getElementById(id)

  if (element) {
    window.scrollTo({ top: element.getBoundingClientRect().top + window.scrollY - offset })
  }
}

/** Height of the sticky toggler block (plus the "Outline" button on small screens). */
const measureStickyHeight = (block: HTMLElement | null): number =>
  block ? block.offsetHeight : DEFAULT_STICKY_HEIGHT

const toSectionOffset = (stickyHeight: number) => SITE_HEADER_HEIGHT + stickyHeight + SECTION_GAP

const useStickyHeight = (blockRef: RefObject<HTMLDivElement | null>) => {
  const [height, setHeight] = useState(DEFAULT_STICKY_HEIGHT)

  useEffect(() => {
    const block = blockRef.current

    if (!block) {
      return undefined
    }

    const measure = () => setHeight(measureStickyHeight(block))
    const observer = new ResizeObserver(measure)

    measure()
    observer.observe(block)
    return () => observer.disconnect()
  }, [blockRef])

  return height
}

const DocumentationGuidePage = ({
  docs,
  tutorial,
  navigation,
  docsTitle,
  imageSource,
}: DocumentationGuidePageProps) => {
  const router = useRouter()
  const pathname = usePathname()
  const [activeId, setActiveId] = useState<string>()
  const [video, setVideo] = useState<VideoModalVideo | null>(null)
  const [isOutlineOpen, setIsOutlineOpen] = useState(false)
  const stickyRef = useRef<HTMLDivElement>(null)
  const stickyHeight = useStickyHeight(stickyRef)
  const sectionOffset = toSectionOffset(stickyHeight)

  const handleOpenTutorial = useCallback((item: DocsTutorial) => {
    if (item?.src) {
      setVideo(toVideo(item))
    }
  }, [])

  // Deep links: `#section` or the legacy `?r=section` (membership plans link that way)
  useEffect(() => {
    const ref =
      window.location.hash.slice(1) || new URLSearchParams(window.location.search).get('r') || ''
    const id = ref ? resolveSectionId(docs, ref) : undefined

    if (!id) {
      return undefined
    }

    // Let images above the target lay out first; measure the sticky block at scroll time
    const timeoutId = window.setTimeout(
      () => scrollToSection(id, toSectionOffset(measureStickyHeight(stickyRef.current))),
      150,
    )
    return () => window.clearTimeout(timeoutId)
  }, [docs, pathname])

  const handleSelectChange = (option: string) => {
    const target = DOCUMENTATION_SWITCHER_OPTIONS.find((item) => item.title === option)

    if (target && target.href !== pathname) {
      router.push(target.href)
    }
  }

  return (
    <Layout className={styles.layout} fullWidth>
      <div
        className={styles.page}
        // Sticky stack height, used by the outline position and section scroll margins (CSS)
        style={{ '--docs-sticky-height': `${stickyHeight}px` } as CSSProperties}
      >
        <div className={styles.sticky} ref={stickyRef}>
          <DocsToggler
            onChange={handleSelectChange}
            options={DOCUMENTATION_SWITCHER_TITLES}
            value={docsTitle}
          />
          <div className={styles.mobileBar}>
            <Button icon={<MenuUnfoldOutlined />} onClick={() => setIsOutlineOpen(true)}>
              Outline
            </Button>
          </div>
        </div>

        <AntLayout className={styles.body} hasSider>
          <AntLayout.Sider className={styles.sider} theme="light" width={346}>
            <DocsNav
              docs={docs}
              items={navigation}
              offset={sectionOffset}
              onActiveChange={setActiveId}
            />
          </AntLayout.Sider>

          <AntLayout.Content className={styles.content}>
            <div className={styles.header}>
              <Typography.Title className={styles.docsTitle} level={2}>
                {docsTitle}
              </Typography.Title>
              {tutorial ? (
                <Button
                  aria-label={`Open tutorial: ${tutorial.title ?? tutorial.text}`}
                  className={styles.headerTutorial}
                  icon={<VideoCameraFilled />}
                  onClick={() => handleOpenTutorial(tutorial)}
                >
                  {tutorial.text}
                </Button>
              ) : null}
            </div>

            {docs.map((item) => (
              <DocsSection
                active={item.id === activeId}
                imageSource={imageSource}
                item={item}
                key={item.id}
                onOpenTutorial={handleOpenTutorial}
              />
            ))}
          </AntLayout.Content>
        </AntLayout>

        <Drawer
          className={styles.drawer}
          onClose={() => setIsOutlineOpen(false)}
          open={isOutlineOpen}
          placement="left"
          title={docsTitle}
          width="min(85vw, 360px)"
        >
          <DocsNav
            docs={docs}
            items={navigation}
            offset={sectionOffset}
            onNavigate={() => setIsOutlineOpen(false)}
          />
        </Drawer>

        <FloatButton.BackTop aria-label="Back to top" visibilityHeight={600} />
        <VideoModal onClose={() => setVideo(null)} video={video} />
      </div>
    </Layout>
  )
}

export default DocumentationGuidePage
