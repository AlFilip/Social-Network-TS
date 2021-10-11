import React, {FormEventHandler, MouseEventHandler, useEffect, useRef} from "react";
import s from './Pagination.module.css'

type PaginationPropsType = {
    totalPagesCount: number
    currentPage: number
    callBack: (pageNumber: number) => void
}

type PageType = { name: string, id: number }

export const Pagination: React.FC<PaginationPropsType> = ({
                                                              totalPagesCount,
                                                              currentPage,
                                                              callBack,
                                                          }) => {

    const getPrepPagesArr = (totalPagesCount: number,
                             currentPage: number,
                             rangeBack: number,
                             rangeForward: number): PageType[] => {
        const res = []
        for (let i = currentPage - rangeBack; i <= currentPage + rangeForward; i++) {
            if (i >= 1 && i <= totalPagesCount) res.push({name: i.toString(), id: i})
        }

        res[0]
        && +res[0].id > 1
        && res.unshift({name: 'First Page', id: 1})

        res[0]
        && +res[res.length - 1].id < totalPagesCount
        && res.push({name: 'Last Page', id: totalPagesCount})

        return res
    }

    const setCurrentPage: MouseEventHandler<HTMLSpanElement> = (e) => {
        callBack(+e.currentTarget.id)
    }

    const inputRef = useRef<HTMLInputElement>(null)
    useEffect(() => {
        if (inputRef.current) inputRef.current.value = currentPage.toString()
    }, [currentPage])

    const getInputValue = () => (
        inputRef
        && inputRef.current
        && +inputRef.current.value > 0
        && +inputRef.current.value < totalPagesCount
        && +inputRef.current.value
    )

    const onSubmitForm: FormEventHandler<HTMLFormElement> = (e) => {
        e.preventDefault()
        const value = getInputValue()

        value
        && callBack(value)
    }

    const getClassName = (m: number) => `${s.pageNumber} ${m === currentPage ? s.currentPageNumber : ''}`
    const pagination = getPrepPagesArr(totalPagesCount, currentPage, 2, 5)
        .map(m => (
            <span key={m.id} id={m.id.toString()} className={getClassName(m.id)} onClick={setCurrentPage}>
                {m.name}
            </span>
        ))

    return (
        <div className={s.pagination}>
            <div className={s.slider}>
                {pagination}
            </div>
            <form onSubmit={onSubmitForm} className={s.form}>
                <input ref={inputRef} type="number"/>
                <button>Go</button>
            </form>
        </div>
    )
}