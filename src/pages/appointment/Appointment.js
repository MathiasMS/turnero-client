import { useState, useEffect } from 'react';
import { Box, Container, FormControl, InputLabel, MenuItem, Pagination, Select, TextField } from '@mui/material';
import BackButton from '../../components/BackButton';
import Header from '../../components/Header';
import React from 'react';
import { apiUrls, httpClient } from '../../utils/client';
import notifiyErrors from '../../utils/notifiyErrors';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import Button from '@mui/material/Button';
import AppointmentCalendar from './AppointmentCalendar';
import Modal from '../../components/Modal';
import ConfirmCancel from '../../components/modals/ConfirmCancel';

const Appointment = () => {
    const [open, setOpen] = useState(false)

    const [page, setPage] = useState(1);
    const [count, setCount] = useState(0);

    const [category, setCategory] = useState('')
    const [categories, setCategories] = useState([])
    const [categoriesLoading, setCategoriesLoading] = useState(false)

    const [procedure, setProcedure] = useState('')
    const [procedures, setProcedures] = useState([])
    const [proceduresLoading, setProceduresLoading] = useState(false)

    const [fromDate, setFromDate] = useState(null);
    const [toDate, setToDate] = useState(null);

    const [proceduresAvailability, setProceduresAvailability] = useState([])
    const [proceduresAvailabilityLoading, setProceduresAvailabilityLoading] = useState(false)

    const handleChange = (event, value) => {
        setPage(value);
    };

    const getCategories = async() => {
        try {
            const { data } = await httpClient.get(apiUrls.categories.getAllPublic)

            if (data) {
                setCategories(data)
            }
        } catch (e) {
            notifiyErrors(e)
        } finally {
            setCategoriesLoading(false)
        }
    }

    const getProcedures = async() => {
        try {
            const { data } = await httpClient.get(apiUrls.procedures.getAllPublic, { params: { category } })

            if (data) {
                setProcedures(data)
            }
        } catch (e) {
            notifiyErrors(e)
        } finally {
            setProceduresLoading(false)
        }
    }

    const showCalendar = async() => {
        try {
            const { data } = await httpClient.get(apiUrls.procedures.getAllProceduresAvailability(procedure), { params: { fromDate, toDate, page: page - 1, limit: 7 } })

            if (data) {
                setProceduresAvailability(data.proceduresAvailability)
                setCount(data.count)
            }
        } catch (e) {
            notifiyErrors(e)
        } finally {
            setProceduresAvailabilityLoading(false)
        }
    }

    const handleCategoryChange = (event) => {
        setCategory(event.target.value);
        setProcedure('');
    };

    const handleProcedureChange = (event) => {
        setProcedure(event.target.value);
    };

    const onCancel = () => {
        setOpen(prevState => !prevState)
    }

    const handleClickAppointment = () => {

    }

    useEffect(() => {
        getCategories()
    }, [])

    useEffect(() => {
        if(category) {
            getProcedures()
        }
    }, [category])

    useEffect(() => {
        if(proceduresAvailability.length > 0) {
            showCalendar()
        }
    }, [page])

    const procedureData = procedures.filter(x => x.id === procedure)

    return (
        <Container>
            <Header title="Solicitar Turno" action={onCancel} color="error" actionLabel="Cancelar Turno"/>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: '15px'}}>
                <FormControl sx={{ width: '30%' }}>
                    <InputLabel id="demo-simple-select-label">Categoria</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={category}
                        label="Categoria"
                        disabled={categoriesLoading}
                        onChange={handleCategoryChange}
                    >
                        {
                            categories.map(item => (
                                <MenuItem key={item.id} value={item.id}>{item.name}</MenuItem>
                            ))
                        }
                    </Select>
                </FormControl>

                <FormControl sx={{ width: '30%'}}>
                    <InputLabel id="demo-simple-select-label">Tramites</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={procedure}
                        label="Categoria"
                        disabled={proceduresLoading}
                        onChange={handleProcedureChange}
                    >
                        {
                            procedures.map(item => (
                                <MenuItem key={item.name} value={item.id}>{item.name}</MenuItem>
                            ))
                        }
                    </Select>
                </FormControl>
                <Box sx={{ display: 'flex', gap: '15px', width: '70%', alignItems: 'end'}}>
                    <Box sx={{ display: 'flex', gap: '15px', width: '70%' }}>
                        <DatePicker
                            label="Fecha inicio"
                            value={fromDate}
                            disabled={!category || !procedure}
                            onChange={(newValue) => {
                                setFromDate(newValue);
                            }}
                            renderInput={(params) => <TextField {...params} />}
                        />
                        <DatePicker
                            label="Fecha fin"
                            value={toDate}
                            disabled={!category || !procedure}
                            onChange={(newValue) => {
                                setToDate(newValue);
                            }}
                            renderInput={(params) => <TextField {...params} />}
                        />
                    </Box>
                    <Box sx={{ display: 'flex', justifyContent: 'center', height: 'fit-content'}}>
                        <Button onClick={showCalendar} size="medium" disabled={!category || !procedure || !fromDate || !toDate} variant="contained">Buscar turno</Button>
                    </Box>
                </Box>
                <Box mt={4}>

                    <Box sx={{ display: 'flex', justifyContent: 'center'}}>
                        {
                            proceduresAvailability.length > 0 && (<Pagination count={count} page={page} onChange={handleChange} />)
                        }
                    </Box>
                    <AppointmentCalendar calendar={proceduresAvailability} procedure={procedureData} onSuccess={showCalendar} handleClickAppointment={handleClickAppointment} />
                </Box>
            </Box>
            <Modal
                open={open}
                setOpen={setOpen}
                title="Cancelar Turno"
                content={<ConfirmCancel onClose={onCancel} />}
            />
        </Container>
    )
}

export default Appointment
