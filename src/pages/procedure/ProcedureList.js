import { apiUrls, httpClient } from '../../utils/client';
import { useEffect, useState } from 'react';
import notifiyErrors from '../../utils/notifiyErrors';
import Header from '../../components/Header';
import BackButton from '../../components/BackButton';
import { Box, IconButton } from '@mui/material';
import Container from '@mui/material/Container';
import DataGrid, { ControlledDataGrid, useDataGridState } from '../../components/Datagrid';
import CreateCategory from '../../components/modals/CreateCategory';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import Modal from '../../components/Modal';
import { toast } from 'react-toastify';
import EditCategory from '../../components/modals/EditCategory';
import { useNavigate } from 'react-router-dom';
import moment from 'moment';

const ActionButtons = ({
    handleRemove,
    handleEdit,
}) => (
    <Box sx={{ display: 'flex', alignItems: "center" }}>
        <Box sx={{ mr: 1 }}>
            <Button variant="contained" onClick={handleEdit} size="small">
                Editar Tramite
            </Button>
        </Box>
        <Box>
            <IconButton aria-label="delete" onClick={handleRemove}>
                <DeleteIcon fontSize="inherit" color="error" />
            </IconButton>
        </Box>
    </Box>
);

const CategoriesGrid = () => {
    const navigate = useNavigate()
    const { state } = useDataGridState();
    const [gridData, setGridData] = useState({
        rows: [],
        totalRows: 0
    })
    const [loading, setLoading] = useState(true)
    // const [open, setOpen] = useState(false);
    // const [editOpen, setEditOpen] = useState(false);
    // const [categoryId, setCategoryId] = useState('');

    const  getProcedures = async() => {
        try {
            const { data } = await httpClient.get(apiUrls.procedures.getAllPaginated, {
                params: {...state}
            })

            if (data) {
                setGridData({
                    rows: data.items,
                    totalRows: data.totalRows
                })
            }
        } catch (e) {
            notifiyErrors(e)
        } finally {
            setLoading(false)
        }
    }

    const onHandleCreation = () => {
        navigate('crear')
    }

    const columns = [
        { field: 'name', headerName: 'Nombre', width: 200, sortable: false, filterable: false},
        { field: 'description', headerName: 'Descripcion', width: 200,  sortable: false, filterable: false},
        { field: 'category', headerName: 'Categoria', width: 150,  sortable: false, filterable: false, valueGetter: ({ row }) => row.category ? row.category.name : ''},
        { field: 'fromDate', headerName: 'Fecha inicio', width: 200, sortable: false, filterable: false, valueGetter: ({ row }) => (row.fromDate ? moment(row.fromDate).format('L') : '-')},
        { field: 'toDate', headerName: 'Fecha fin', width: 200, sortable: false, filterable: false, valueGetter: ({ row }) => (row.toDate ? moment(row.toDate).format('L') : '-')},
        {
            field: 'actions',
            headerName: 'Actions',
            sortable: false,
            width: 400,
            renderCell: ({ row }) => {
                const handleEdit = () => {
                    navigate(`editar/${row.id}`)
                }

                const handleRemove = async () => {
                    try {
                        const { data } = await httpClient.delete(apiUrls.procedures.remove(row.id))

                        if (data) {
                            toast.success("Categoria eliminada exitosamente!")
                            getProcedures()
                        }
                    } catch (e) {
                        notifiyErrors(e)
                    } finally {
                        setLoading(false)
                    }
                }

                return (<ActionButtons handleEdit={handleEdit} handleRemove={handleRemove} />)
            }
        }
    ]


    useEffect(() => {
        getProcedures()
    }, [state])

    return (
        <Container>
            <Box sx={{ display: "flex"}}>
                <BackButton />
            </Box>
            <Header title="Tramite" actionLabel="Crear tramite" action={onHandleCreation} />
            <DataGrid
                columns={columns}
                rows={gridData.rows}
                loading={loading}
                rowCount={gridData.totalRows}
            />
        </Container>
    )
}

const CategoriesList = () => (
    <ControlledDataGrid>
        <CategoriesGrid />
    </ControlledDataGrid>
)

export default CategoriesList
