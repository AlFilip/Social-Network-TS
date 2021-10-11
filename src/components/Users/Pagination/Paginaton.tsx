import React, {MouseEventHandler} from "react";
import s from './Pagination.module.css'

type PaginationType = {
    totalPagesCount: number
    currentPage: number
    callBack: (pageNumber: number) => void
}

type PageType = { name: string, id: number }

export const Pagination: React.FC<PaginationType> = ({
                                                         totalPagesCount,
                                                         currentPage,
                                                         callBack,
                                                     }) => {
    const getPagesNumbers = (totalPagesCount: number, currentPage: number, rangeBack: number, rangeForward: number): PageType[] => {
        const res = []
        for (let i = currentPage - rangeBack; i <= currentPage + rangeForward; i++) {
            if (i >= 1 && i <= totalPagesCount) res.push({name: i.toString(), id: i})
        }

        res[0]
        && +res[0].id > 1
        && res.unshift({name: 'First Page', id: 1})

        res[0]
        &&Number.isInteger(+res[res.length - 1].id)
        && +res[res.length - 1].id < totalPagesCount
        && res.push({name: 'Last Page', id: totalPagesCount})

        return res
    }
    const setCurrentPage: MouseEventHandler<HTMLSpanElement> = (e) => {
        console.log(e.currentTarget)
        callBack(+e.currentTarget.id)
    }
    const getClassName = (m: number) => `${s.pageNumber} ${m === currentPage ? s.currentPageNumber : ''}`
    const pagination = getPagesNumbers(totalPagesCount, currentPage, 2, 5)
        .map(m => (
            <span key={m.id} id={m.id.toString()} className={getClassName(m.id)} onClick={setCurrentPage}>
                {m.name}
            </span>
        ))

    return (
        <div>
            {pagination}
        </div>
    )
}