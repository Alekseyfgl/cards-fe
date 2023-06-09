import s from './styles.module.scss';
import React, { ChangeEvent, MouseEvent, useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { selectorIsAppInit } from '../../../app/app.selector';
import { Navigate, useSearchParams } from 'react-router-dom';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import TableContainer from '@mui/material/TableContainer';
import Table from '@mui/material/Table';
import { THeaderPack } from './HeaderPack/THeaderPack';
import { PaginationCustom } from '../PaginationCustom/Pagination';
import { IPacks, PackQueryTypes, PackSortRequestTypes, PackSortTypes } from '../packs.interfaces';
import { Nullable } from '../../../common/utils/optionalTypes/optional.types';
import { selectorPacks } from '../packs.selector';
import { superSortCreator } from '../utils/super-sort';
import { packThunks } from '../packs.slice';
import { createPackQuery } from '../utils/mappers/pack.mapper';
import { PackSettings } from '../Settings/PackSettings';
import { BodyPack } from './BodyPack/BodyPack';

export const ListPacks = () => {
    const dispatch = useAppDispatch();

    const isAppInitialized: boolean = useAppSelector(selectorIsAppInit);
    const packs: Nullable<IPacks> = useAppSelector(selectorPacks);

    const [searchParams, setSearchParams] = useSearchParams(createPackQuery());
    const params: PackQueryTypes = Object.fromEntries(searchParams);

    const [page, setPage] = useState(params.page || '1');
    const [rowsPerPage, setRowsPerPage] = useState(params.pageCount || '5');
    const [sortPacks, setSortPacks] = useState<PackSortRequestTypes>((params.sortPacks as PackSortRequestTypes) || '0name');
    const [searchValue, setSearchValue] = useState(params.packName || '');
    const [accessory, setAccessory] = useState(params.user_id || '');
    const [amountCards, setAmountCards] = useState<number[]>([+params.min!, +params.max!]);

    useEffect(() => {
        dispatch(packThunks.getAllPacks(searchParams as PackQueryTypes));
    }, [searchParams]);

    const searchHandler = (searchValue: Nullable<string>) => {
        if (searchValue !== null) {
            setSearchValue(searchValue);
            setSearchParams(createPackQuery(page, rowsPerPage, sortPacks, searchValue, accessory, amountCards));
        }
    };

    const resetAllFilters = () => {
        setSearchValue('');
        setAccessory('');
        setAmountCards([1, 100]);
        setSortPacks('0name')
        setSearchParams(createPackQuery(page, rowsPerPage));
    };

    const setAmountCardsHandler = (amountCards: number[]) => {
        setAmountCards(amountCards);
        setSearchParams(createPackQuery(page, rowsPerPage, sortPacks, searchValue, accessory, amountCards));
    };
    const accessoryHandler = (accessory: string) => {
        setAccessory(accessory);
        setSearchParams(createPackQuery(page, rowsPerPage, sortPacks, searchValue, accessory, amountCards));
    };

    const handleRequestSort = (e: MouseEvent<unknown>, property: PackSortTypes) => {
        const prop: PackSortRequestTypes = superSortCreator(property, sortPacks);
        setSearchParams(createPackQuery(page, rowsPerPage, prop, searchValue, accessory, amountCards));
        setSortPacks(prop);
    };

    const onChangePagination = (newPage: number, rowsPerPage: number) => {
        setSearchParams(createPackQuery(newPage.toString(), rowsPerPage.toString(), sortPacks, searchValue, accessory, amountCards as number[]));
    };
    const handleChangePage = (event: unknown, newPage: number) => {
        onChangePagination(newPage, +rowsPerPage);
        setPage(newPage.toString());
    };

    const handleChangeRowsPerPage = (event: ChangeEvent<HTMLInputElement>) => {
        const rowsPerPage: number = +event.target.value;
        setRowsPerPage(rowsPerPage.toString());
        setPage('1');
        onChangePagination(1, rowsPerPage);
    };

    if (!isAppInitialized) return <Navigate to={'/login'} />;
    return (
        <Container maxWidth="lg" sx={{ p: 8 }}>
            <h1 className={s.title}>Packs</h1>
            <PackSettings
                searchHandler={searchHandler}
                accessoryHandler={accessoryHandler}
                setAmountCards={setAmountCardsHandler}
                resetAllFilters={resetAllFilters}
                amountCards={amountCards}
                accessory={accessory}
                searchValue={searchValue}
            />
            <Box sx={{ width: '100%' }}>
                <Paper elevation={3}>
                    <TableContainer>
                        <Table sx={{ minWidth: 750 }} aria-labelledby="tableTitle">
                            <THeaderPack orderBy={sortPacks} onRequestSort={handleRequestSort} />
                            <BodyPack />
                        </Table>
                    </TableContainer>

                    {packs && (
                        <PaginationCustom
                            page={packs.page}
                            rowsPerPage={+rowsPerPage}
                            totalCount={packs.cardPacksTotalCount}
                            handleChangePage={handleChangePage}
                            handleChangeRowsPerPage={handleChangeRowsPerPage}
                        />
                    )}
                </Paper>
            </Box>
        </Container>
    );
};
