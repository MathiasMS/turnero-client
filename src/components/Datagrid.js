import React, {
    createContext,
    useContext,
    memo,
    useEffect,
    useState,
} from 'react';

import {
    DataGrid as MuiDataGrid,
} from '@mui/x-data-grid';

import Grid from '@mui/material/Grid';

const INITIAL_DATAGRID_STATE = {
    page: 0,
    limit: 10,
    order: 'desc',
    orderBy: '',
};

export const DataGridContext = createContext({ state: INITIAL_DATAGRID_STATE, setState: () => null });

const DataGridProvider = DataGridContext.Provider;

export const useDataGridState = () => {
    const { state, setState } = useContext(DataGridContext);

    return { state, setState };
};

export const ControlledDataGrid = ({ children }) => {
    const [state, setState] = useState(INITIAL_DATAGRID_STATE);

    return (
        <DataGridProvider value={{ state, setState }}>{children}</DataGridProvider>
    );
};

const DataGrid = ({
    columns,
    rows,
    rowCount,
    loading,
    handleQueryChange = () => null,
    getRowId = (row) => row.id,
    onRowClick,
    onCellClick,
    checkboxSelection = false,
    paginationMode = 'server',
    sortingMode = 'server',
    disableQueryOnMount = false,
}) => {
    const { state, setState } = useContext(DataGridContext);

    const [selectionModel, setSelectionModel] = useState([]);

    const [isMounted, setIsMounted] = useState(false);

    const handleSortModelChange = (sortModel) => {
        if (sortModel.length) {
            const { sort, field } = sortModel[0];
            setState((prevState) => ({
                ...prevState,
                order: sort,
                orderBy: field,
            }));
        } else {
            setState((prevState) => ({
                ...prevState,
                order: 'desc',
                orderBy: undefined,
            }));
        }
    };

    const handlePageChange = (value) => {
        setState((prevState) => ({ ...prevState, page: value }));
    };

    useEffect(() => {
        if (!disableQueryOnMount) {
            handleQueryChange(state);
        }

        setIsMounted(true);
    }, [disableQueryOnMount, handleQueryChange, state]);

    useEffect(() => {
        if (isMounted) {
            handleQueryChange(state);
        }
    }, [handleQueryChange, isMounted, state]);

    return (
        <Grid
            container
            flexGrow={1}
            sx={{
                minHeight: 700,
                width: 'inherit',
                mt: 2,
            }}
        >
            <MuiDataGrid
                autoHeight={true}
                sortingMode={sortingMode}
                pagination={true}
                paginationMode={paginationMode}
                checkboxSelection={checkboxSelection}
                onRowClick={onRowClick}
                onCellClick={onCellClick}
                getRowId={getRowId}
                onSortModelChange={handleSortModelChange}
                onPageChange={(newPage) => {
                    handlePageChange(newPage);
                }}
                onPageSizeChange={(newLimit) => {
                    setState((prevState) => ({ ...prevState, limit: newLimit }));
                }}
                onSelectionModelChange={(newSelectionModel) => {
                    setSelectionModel(newSelectionModel);
                }}
                disableSelectionOnClick
                selectionModel={selectionModel}
                columns={columns}
                rows={rows}
                rowCount={rowCount}
                rowsPerPageOptions={[10,20,50]}
                page={state.page}
                pageSize={state.limit}
                loading={loading}
                sx={{
                    border: 'none',
                }}
            />
        </Grid>
    );
};

export default memo(DataGrid);
