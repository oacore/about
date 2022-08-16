import { useState, useEffect } from 'react'

const useTable = ({ itemsPerPage = 20, initialData }) => {
  const [inputValue, setInputValue] = useState('')
  const [membersList, setMembersList] = useState(initialData)
  const [isNoResults, setIsNoResults] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const [pagesCount, setPagesCount] = useState(
    Math.ceil(membersList.length / itemsPerPage)
  )

  const handlePaginate = (action, list = initialData) => {
    let activePage = 0
    switch (action) {
      case 'next':
        activePage = Math.min(currentPage + 1, pagesCount)
        break
      case 'prev':
        activePage = Math.max(currentPage - 1, 1)
        break

      default:
        activePage = 1
        break
    }
    const begin = (activePage - 1) * itemsPerPage
    const end = begin + itemsPerPage
    const currentMembers = list.slice(begin, end)
    setCurrentPage(activePage)
    setMembersList(currentMembers)
    setPagesCount(Math.ceil(list.length / itemsPerPage))
  }

  const handleSearch = (e) => {
    const { value } = e.target
    setInputValue(value)
    const founded = initialData.filter((member) =>
      member.organisation_name.toLowerCase().includes(value)
    )
    if (founded.length === 0) setIsNoResults(true)
    else setIsNoResults(false)

    handlePaginate('initial', founded)
  }

  useEffect(() => {
    handlePaginate('initial')
  }, [])

  return {
    handlePaginate,
    handleSearch,
    inputValue,
    itemsList: membersList,
    isNoResults,
    activePage: currentPage,
    pagesCount,
  }
}
export default useTable
