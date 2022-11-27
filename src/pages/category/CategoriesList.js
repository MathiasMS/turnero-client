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

const ActionButtons = ({
    handleRemove,
    handleEdit,
}) => (
    <Box sx={{ display: 'flex', alignItems: "center" }}>
        <Box sx={{ mr: 1 }}>
            <Button variant="contained" onClick={handleEdit} size="small">
                Editar categoria
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
    const { state } = useDataGridState();
    const [gridData, setGridData] = useState({
        rows: [],
        totalRows: 0
    })
    const [loading, setLoading] = useState(true)
    const [open, setOpen] = useState(false);
    const [editOpen, setEditOpen] = useState(false);
    const [categoryId, setCategoryId] = useState('');

    const getCategories = async() => {
        try {
            const { data } = await httpClient.get(apiUrls.categories.getAllPaginated, {
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

    const onCategoryCreation = () => {
        toast.success("Categoria creada exitosamente!")
        getCategories()
        setOpen(false)
    }

    const onCategoryEdition = () => {
        toast.success("Categoria actualizada exitosamente!")
        getCategories()
        setEditOpen(false)
    }

    const handleCreateOpen = () => {
        setOpen(true);
    }

    const handleEditOpen = () => {
        setEditOpen(true);
    }

    const columns = [
        { field: 'name', headerName: 'Nombre', width: 400, sortable: false, filterable: false},
        { field: 'quota', headerName: 'Cupo', width: 100,  sortable: false, filterable: false},
        { field: 'fraction', headerName: 'Fraccion', width: 100,  sortable: false, filterable: false},
        { field: 'createdAt', headerName: 'Creado en', width: 200, sortable: false, filterable: false, valueGetter: ({ row }) => (new Date(row.createdAt).toLocaleString())},
        {
            field: 'actions',
            headerName: 'Actions',
            sortable: false,
            width: 400,
            renderCell: ({ row }) => {
                const handleEdit = () => {
                    setCategoryId(row.id)
                    handleEditOpen()
                }

                const handleRemove = async () => {
                    try {
                        const { data } = await httpClient.delete(apiUrls.categories.remove(row.id))

                        if (data) {
                            toast.success("Categoria eliminada exitosamente!")
                            getCategories()
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
        getCategories()
    }, [state])

    return (
        <Container>
            <Box sx={{ display: "flex"}}>
                <BackButton />
            </Box>
            <Header title="Categorias" actionLabel="Crear categoria" action={handleCreateOpen} />
            <Modal
                open={open}
                setOpen={setOpen}
                title="Crear categoria"
                content={<CreateCategory onCategoryCreation={onCategoryCreation} />}
            />
            <Modal
                open={editOpen}
                setOpen={setEditOpen}
                title="Editar categoria"
                content={<EditCategory onCategoryEdition={onCategoryEdition} categoryId={categoryId}/>}
            />
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
