import React from 'react';
import clsx from 'clsx';
import { usePagination, useTable } from 'react-table';
import { AiFillBackward, AiFillForward, AiFillCaretLeft, AiFillCaretRight } from 'react-icons/ai';

import style from './Table.module.scss';
import { useEffect } from 'react';

function Table({ columns, data }) {
    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        prepareRow,
        page,

        canPreviousPage,
        canNextPage,
        pageOptions,
        pageCount,
        gotoPage,
        nextPage,
        previousPage,
        setPageSize,
        state: { pageIndex, pageSize },
    } = useTable(
        {
            columns,
            data,
            initialState: { pageIndex: 0 },
        },
        usePagination,
    );

    useEffect(() => {
        setPageSize(5);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <>
            <table {...getTableProps()} className={clsx(style.table)}>
                <thead>
                    {headerGroups.map((headerGroup) => (
                        <tr {...headerGroup.getHeaderGroupProps()} className={clsx(style.tr)}>
                            {headerGroup.headers.map((column) => (
                                <th {...column.getHeaderProps()} className={clsx(style.th)}>
                                    {column.render('Header')}
                                </th>
                            ))}
                        </tr>
                    ))}
                </thead>
                <tbody {...getTableBodyProps()}>
                    {page.map((row, i) => {
                        prepareRow(row);
                        return (
                            <tr {...row.getRowProps()} className={clsx(style.tr)}>
                                {row.cells.map((cell) => {
                                    return (
                                        <td {...cell.getCellProps()} className={clsx(style.td)}>
                                            {cell.render('Cell')}
                                        </td>
                                    );
                                })}
                            </tr>
                        );
                    })}
                </tbody>
            </table>
            <div className={clsx(style.pagination)}>
                <div className={clsx(style.left)}>
                    <AiFillBackward
                        onClick={() => gotoPage(0)}
                        disabled={!canPreviousPage}
                        className={clsx(style['firt-icon'])}
                    />
                    <AiFillCaretLeft
                        onClick={() => previousPage()}
                        disabled={!canPreviousPage}
                        className={clsx(style.icon)}
                    />
                    <div className={clsx(style['wrapper-input'])}>
                        <span>Page</span>
                        <input
                            type="number"
                            value={pageIndex + 1}
                            onChange={(e) => {
                                const page = e.target.value ? Number(e.target.value) - 1 : 0;
                                gotoPage(page);
                            }}
                            className={clsx(style.input)}
                        />
                        <span>of {pageOptions.length}</span>
                    </div>
                    <AiFillCaretRight onClick={() => nextPage()} disabled={!canNextPage} className={clsx(style.icon)} />
                    <AiFillForward
                        onClick={() => gotoPage(pageCount - 1)}
                        disabled={!canNextPage}
                        className={clsx(style['last-icon'])}
                    />
                </div>
                <div className={clsx(style.right)}>
                    <span className={clsx(style['title-select'])}>Row per page</span>
                    <select
                        value={pageSize}
                        onChange={(e) => {
                            setPageSize(Number(e.target.value));
                        }}
                        className={clsx(style.select)}
                    >
                        {[5, 6, 7, 8, 9, 10].map((pageSize) => (
                            <option key={pageSize} value={pageSize}>
                                {pageSize}
                            </option>
                        ))}
                    </select>
                </div>
            </div>
        </>
    );
}

export default Table;
