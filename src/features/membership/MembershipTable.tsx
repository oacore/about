'use client'

import { Button, Input, Table } from 'antd'
import type { ColumnsType } from 'antd/es/table'
import {
  type ChangeEvent,
  type ElementType,
  type KeyboardEvent,
  type MouseEvent,
  useCallback,
  useMemo,
  useState,
} from 'react'

import imagePlaceholder from '@/assets/icons/imagePlaceholder.svg'

import { Section } from '@components/layout'
import Markdown from '@components/Markdown/Markdown'
import {
  isUsrnPartner,
  resolveRepoId,
  sortMembers,
} from '@features/membership/constants'
import type {
  CoreMember,
  MembershipComparisonHeader,
  MembershipComparisonTable,
  MembershipFeePrice,
  MembershipFeeRow,
  MembershipFeeTable,
} from '@features/membership/types'
import { patchStats } from '@utils/patchStats'

import styles from './styles.module.css'

const INITIAL_DISPLAY_COUNT = 30
const SHOW_MORE_INCREMENT = 10

type ComparisonTableProps = {
  textData: MembershipComparisonTable
  className?: string
  headerAlignment?: boolean
}

type PricesTableProps = {
  textData: MembershipFeeTable & { title?: string; caption?: string }
  className?: string
  renderSpan?: boolean
  statistics?: Record<string, string | number>
}

type MembersListTableProps = {
  title?: string
  members: CoreMember[]
  className?: string
  /** Plain A–Z order (supporters page) instead of grouping by membership type */
  sortByName?: boolean
}

type MembershipTableProps =
  | ({ type: 'details' } & ComparisonTableProps)
  | ({ type: 'prices' } & PricesTableProps)
  | ({ type: 'members' } & MembersListTableProps)

type ComparisonRow = MembershipComparisonTable['rows'][number] & { key: string | number }

type PriceRow = MembershipFeeRow & { key: string | number }

type SelectedPrice = {
  price?: number | string
  size?: string
}

const joinClasses = (...classes: Array<string | false | undefined>): string =>
  classes.filter(Boolean).join(' ')

const Price = ({
  className,
  price,
  tag: Tag = 'span',
}: {
  className?: string
  price: number | string
  tag?: ElementType
}) => (
  <Tag className={joinClasses(styles.price, className)}>
    {new Intl.NumberFormat('en-GB', {
      style: 'currency',
      currency: 'GBP',
      minimumSignificantDigits: 1,
      maximumSignificantDigits: 4,
    }).format(Number(price))}{' '}
    p.a
  </Tag>
)

const renderFeatureCell = (row: MembershipComparisonTable['rows'][number]) => (
  <>
    <Markdown
      className={joinClasses(
        styles.cellTitle,
        !row.descriptionCardTable && styles.cellPadding,
      )}
    >
      {row.title}
    </Markdown>
    {row.descriptionCardTable ? (
      row.id === 23 ? (
        <div className={styles.cellRedirect}>
          Aligning with established metadata practices is key for the interoperability of your
          repository with external systems and for meeting FAIR principles. Funders increasingly
          mandate the use of established metadata profiles. The RIOXX metadata validator is a tool
          that helps you validate compliance of individual metadata records with a{' '}
          <a href="https://www.rioxx.net/profiles/" rel="nofollow noreferrer" target="_blank">
            RIOXX
          </a>{' '}
          , a widely used metadata standard for repositories.
        </div>
      ) : (
        <Markdown className={styles.cellDescription}>{row.descriptionCardTable}</Markdown>
      )
    ) : null}
  </>
)

const renderPlanCell = (
  row: MembershipComparisonTable['rows'][number],
  planName: string,
) => {
  const isIncluded = row.plans?.includes(planName)
  const caption = row.captions?.find((item) => item.plan === planName)?.name

  return (
    <>
      {row.plans ? (
        <span
          aria-label={isIncluded ? 'Included' : 'Not included'}
          className={joinClasses(
            styles.box,
            isIncluded ? styles.checked : styles.uncheked,
          )}
        />
      ) : null}
      {caption ? <span className={styles.caption}>{caption}</span> : null}
    </>
  )
}

const renderPriceCellContent = (price: MembershipFeePrice | undefined) => {
  if (!price) return null

  if (price.deal) {
    return <div className={styles.periodDeal}>{price.deal}</div>
  }

  if (price.original != null) {
    return <Price price={price.original} />
  }

  return null
}

const renderComparisonHeaderTitle = (header?: MembershipComparisonHeader) => (
  <>
    <Markdown className={joinClasses(styles.headerTitle, styles.headerTitleDetails)}>
      {header?.name ?? ''}
    </Markdown>
    {header?.defaultText ? (
      <span className={styles.headerMeta}>
        <span className={styles.headerMetaPrice}>{header.defaultText.trim()}</span>
        {header.status ? <span className={styles.headerMetaStatus}> {header.status}</span> : null}
      </span>
    ) : null}
  </>
)

const ComparisonTable = ({
  textData,
  className,
  headerAlignment = false,
}: ComparisonTableProps) => {
  const planHeaders = textData.headers.slice(1)
  const featureHeader = textData.headers[0]

  const columns: ColumnsType<ComparisonRow> = [
    {
      title: renderComparisonHeaderTitle(featureHeader),
      key: 'feature',
      onHeaderCell: () => ({
        className: joinClasses(
          styles.header,
          featureHeader?.name.length === 0 && styles.headerEmpty,
        ),
      }),
      onCell: (row) => ({
        className: joinClasses(
          styles.cellDetailsFirst,
          !row.descriptionCardTable && styles.cellBackGround,
        ),
      }),
      render: (_, row) => renderFeatureCell(row),
    },
    ...planHeaders.map((header) => ({
      title: renderComparisonHeaderTitle(header),
      key: header.name,
      align: 'center' as const,
      onHeaderCell: () => ({ className: styles.header }),
      onCell: () => ({ className: styles.cell }),
      render: (_: unknown, row: ComparisonRow) => renderPlanCell(row, header.name),
    })),
  ]

  const dataSource: ComparisonRow[] = textData.rows.map((row, index) => ({
    ...row,
    key: row.id ?? index,
  }))

  return (
    <div className={joinClasses(styles.container, className)}>
      <Markdown
        className={joinClasses(styles.title, headerAlignment && styles.alignLeft)}
      >{`<div class="${styles.lowerCase}">${textData.title}</div>`}</Markdown>
      <div className={styles.titleBorder} />
      <Table<ComparisonRow>
        bordered
        className={styles.membershipTable}
        columns={columns}
        dataSource={dataSource}
        pagination={false}
        scroll={{ x: 'max-content' }}
      />
    </div>
  )
}

const PricesTable = ({
  textData,
  className,
  renderSpan = false,
  statistics,
}: PricesTableProps) => {
  const [selectedPrice, setSelectedPrice] = useState<SelectedPrice>({})
  const title = patchStats(textData.title, statistics)
  const planName = statistics?.planName?.toString().toLowerCase()
  const sizeHeader = textData.headers[0]
  const priceCount = textData.rows[0]?.prices?.length ?? 0

  const handleSelectActivePlan = useCallback(
    (price: number | string | undefined, size?: string) => {
      if (price == null) return
      setSelectedPrice({ price, size })
    },
    [],
  )

  const isFeeSectionTable = className?.split(/\s+/).includes(styles.feeSectionTable) ?? false
  const equalColumnWidth = isFeeSectionTable ? `${100 / (priceCount + 1)}%` : undefined

  const columns: ColumnsType<PriceRow> = useMemo(() => {
    const sizeColumn = {
      title: <Markdown className={styles.headerTitle}>{sizeHeader?.name ?? ''}</Markdown>,
      key: 'size',
      width: equalColumnWidth,
      align: 'center' as const,
      onHeaderCell: () => ({
        className: joinClasses(
          styles.header,
          sizeHeader?.name.length === 0 && styles.headerEmpty,
        ),
      }),
      onCell: () => ({ className: styles.cellPricesFirst }),
      render: (_: unknown, row: PriceRow) => (
        <>
          {row.title ? <Markdown>{row.title}</Markdown> : null}
          {row.caption ? (
            <Markdown className={styles.cellPricesFirstCaption}>{row.caption}</Markdown>
          ) : null}
        </>
      ),
    }

    const priceColumns = Array.from({ length: priceCount }, (_, index) => {
      const headerIndex = renderSpan ? Math.floor(index / 2) + 1 : index + 1
      const header = textData.headers[headerIndex]
      const isGroupStart = !renderSpan || index % 2 === 0

      return {
        title: isGroupStart && header ? (
          <Markdown className={styles.headerTitle}>{header.name}</Markdown>
        ) : null,
        key: `price-${index}`,
        width: equalColumnWidth,
        align: 'center' as const,
        onHeaderCell: () => {
          const headerClass = joinClasses(
            styles.header,
            planName === header?.name.toLowerCase() && styles.headerActive,
            header?.name.length === 0 && styles.headerEmpty,
          )

          if (!renderSpan) {
            return { className: headerClass }
          }

          if (isGroupStart) {
            return { className: headerClass, colSpan: 2 }
          }

          return { colSpan: 0 }
        },
        onCell: (row: PriceRow) => {
          const price = row.prices?.[index]
          const activePrice = price?.discount ?? price?.original
          const isActive =
            (selectedPrice.price === price?.discount ||
              selectedPrice.price === price?.original) &&
            selectedPrice.size === row.title

          const handleKeyDown = (event: KeyboardEvent<HTMLTableCellElement>) => {
            if (event.key !== 'Enter' && event.key !== ' ') return
            event.preventDefault()
            handleSelectActivePlan(activePrice, row.title)
          }

          return {
            className: joinClasses(
              styles.cell,
              styles.cellPrices,
              price?.indicator && styles.indicatorColor,
              isActive && styles.cellPricesActive,
            ),
            onClick: () => handleSelectActivePlan(activePrice, row.title),
            onKeyDown: handleKeyDown,
            tabIndex: activePrice != null ? 0 : undefined,
          }
        },
        render: (_: unknown, row: PriceRow) => renderPriceCellContent(row.prices?.[index]),
      }
    })

    return [sizeColumn, ...priceColumns]
  }, [
    equalColumnWidth,
    handleSelectActivePlan,
    planName,
    priceCount,
    renderSpan,
    selectedPrice,
    sizeHeader?.name,
    textData.headers,
  ])

  const dataSource: PriceRow[] = textData.rows.map((row, index) => ({
    ...row,
    key: row.title ?? index,
  }))

  return (
    <div className={joinClasses(styles.container, className)}>
      {title ? (
        <Markdown className={styles.title}>{`<div class="${styles.lowerCase}">${title}</div>`}</Markdown>
      ) : null}
      {title ? <div className={styles.titleBorder} /> : null}
      {/*TODO CHECK*/}
      {/*{textData.caption ? <div className={styles.tableCaption}>{textData.caption}</div> : null}*/}
      <Table<PriceRow>
        bordered
        className={joinClasses(
          styles.membershipTable,
          styles.membershipTableFixed,
          isFeeSectionTable && styles.feeSectionTableLayout,
        )}
        columns={columns}
        dataSource={dataSource}
        pagination={false}
        scroll={isFeeSectionTable ? undefined : { x: 'max-content' }}
      />
    </div>
  )
}

const MemberLogo = ({ repoId }: { repoId: number | number[] }) => {
  const logoUrl = `https://api.core.ac.uk/data-providers/${resolveRepoId(repoId)}/logo`
  const [src, setSrc] = useState(logoUrl)

  const showPlaceholder = () => setSrc(imagePlaceholder.src)

  return (
    <div className={styles.logoWrapper}>
      <img
        alt="Organisation logo"
        className={styles.repositoryLogo}
        onError={showPlaceholder}
        ref={(node) => {
          if (node?.complete && node.naturalWidth === 0) showPlaceholder()
        }}
        src={src}
      />
    </div>
  )
}

const MembersListTable = ({ title, members, className, sortByName = false }: MembersListTableProps) => {
  const [searchValue, setSearchValue] = useState('')
  const [displayedItems, setDisplayedItems] = useState(INITIAL_DISPLAY_COUNT)

  const handleSearch = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value)
    setDisplayedItems(INITIAL_DISPLAY_COUNT)
  }

  const handleRedirect = useCallback((repoId: number | number[]) => {
    if (typeof window === 'undefined') return

    window.location.href = `https://core.ac.uk/data-providers/${resolveRepoId(repoId)}`
  }, [])

  const handleRowClick = useCallback(
    (repoId: number | number[]) => () => {
      handleRedirect(repoId)
    },
    [handleRedirect],
  )

  const handleLinkClick = (event: MouseEvent<HTMLAnchorElement>) => {
    event.stopPropagation()
  }

  const filteredMembers = useMemo(
    () =>
      members.filter((member) =>
        member.organisation_name.toLowerCase().includes(searchValue.toLowerCase()),
      ),
    [members, searchValue],
  )

  const sortedMembers = useMemo(
    () =>
      [...filteredMembers].sort(
        sortByName
          ? (a, b) => a.organisation_name.localeCompare(b.organisation_name)
          : sortMembers,
      ),
    [filteredMembers, sortByName],
  )

  const visibleMembers = useMemo(
    () => sortedMembers.slice(0, displayedItems),
    [displayedItems, sortedMembers],
  )

  const handleShowMore = () => {
    setDisplayedItems((previousCount) =>
      Math.min(previousCount + SHOW_MORE_INCREMENT, filteredMembers.length),
    )
  }

  const renderBillingType = (member: CoreMember) => {
    if (isUsrnPartner(member)) {
      return (
        <a
          className={styles.memberColumn}
          href="https://sparcopen.org/our-work/us-repository-network/discovery-pilot-project/"
          onClick={handleLinkClick}
          rel="noreferrer"
          target="_blank"
        >
          USRN Partner
        </a>
      )
    }

    return (
      <a
        className={styles.memberColumn}
        href="https://core.ac.uk/membership"
        onClick={handleLinkClick}
        rel="noreferrer"
        target="_blank"
      >
        {member.billing_type} Member
      </a>
    )
  }

  const columns: ColumnsType<CoreMember> = [
    {
      title: 'Organisation name',
      key: 'organisation_name',
      onCell: () => ({ className: styles.organisationCell }),
      render: (_, member) => (
        <div className={styles.organisationWrapper}>
          <MemberLogo repoId={member.repo_id} />
          <span className={styles.organisationName}>{member.organisation_name}</span>
        </div>
      ),
    },
    {
      title: 'Country',
      dataIndex: 'country',
      key: 'country',
      render: (country: string) => country || '—',
    },
    {
      title: 'Membership status',
      key: 'status',
      onCell: () => ({ className: styles.memberColumn }),
      render: (_, member) => renderBillingType(member),
    },
  ]

  return (
    <Section className={joinClasses(styles.supporters, className)} id="membership-list">
      {title ? <h3 className={styles.pageTitle}>{title}</h3> : null}
      <form>
        <Input
          aria-label="Find Organisation"
          className={styles.search}
          id="membership-search"
          name="institution"
          onChange={handleSearch}
          placeholder="e.g Open University"
          type="search"
          value={searchValue}
        />
      </form>
      <Table
        className={joinClasses(styles.dataTable, styles.membersTable)}
        columns={columns}
        dataSource={visibleMembers.map((member) => ({
          ...member,
          key: member.organisation_id,
        }))}
        locale={{ emptyText: 'No results. Please update your query' }}
        onRow={(member) => ({
          className: styles.tableRow,
          onClick: handleRowClick(member.repo_id),
        })}
        pagination={false}
        scroll={{ x: true }}
      />
      {filteredMembers.length > 0 ? (
        <div className={styles.paginationRow}>
          <p className={styles.paginationText}>
            Showing 1 - {Math.min(displayedItems, filteredMembers.length)}
          </p>
          <Button
            disabled={displayedItems >= filteredMembers.length}
            onClick={handleShowMore}
            type="default"
          >
            Show More
          </Button>
        </div>
      ) : null}
    </Section>
  )
}

const MembershipTable = (props: MembershipTableProps) => {
  if (props.type === 'details') {
    return (
      <ComparisonTable
        className={props.className}
        headerAlignment={props.headerAlignment}
        textData={props.textData}
      />
    )
  }

  if (props.type === 'prices') {
    return (
      <PricesTable
        className={props.className}
        renderSpan={props.renderSpan}
        statistics={props.statistics}
        textData={props.textData}
      />
    )
  }

  return (
    <MembersListTable
      className={props.className}
      members={props.members}
      sortByName={props.sortByName}
      title={props.title}
    />
  )
}

export default MembershipTable
