import s from './Pagination.module.css'


export type PageType = { name: string, id: number }

export const getButtonClassNameHelper = (m: number, currentPage: number) => `${ s.pageNumber } ${ m === currentPage ? s.currentPageNumber : '' }`

export const paginationHelpers = (totalPagesCount: number,
                                  currentPage: number,
                                  rangeBack: number,
                                  rangeForward: number): PageType[] => {
    let res: PageType[] = []
    for (let i = currentPage - rangeBack; i <= currentPage + rangeForward; i++) {
        if (i >= 1 && i <= totalPagesCount) {
            res = [...res, { name: i.toString(), id: i }]
        }
    }

    res[0]
    && +res[0].id > 1
    && ( res = [{ name: 'First Page', id: 1 }, ...res] )

    res[0]
    && +res[res.length - 1].id < totalPagesCount
    && ( res = [...res, { name: 'Last Page', id: totalPagesCount }] )

    return res
}
