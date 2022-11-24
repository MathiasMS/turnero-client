import React, { useState, useEffect } from 'react'
import { Box, FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import BackButton from '../../components/BackButton';
import Header from '../../components/Header';
import Container from '@mui/material/Container';
import { v4 as uuidv4 } from 'uuid';
import { apiUrls, httpClient } from '../../utils/client';
import notifiyErrors from '../../utils/notifiyErrors';

import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { convert, createCalendar } from '../../utils/date';
import Calendar from './Calendar';
import Button from '@mui/material/Button';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

const EditeProcedure = () => {
    const { id } = useParams()
    const navigate = useNavigate()
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [fromDate, setFromDate] = useState(new Date());
    const [toDate, setToDate] = useState(new Date());
    const [loading, setLoading] = useState(true);
    const [categories, setCategories] = useState([]);
    const [category, setCategory] = useState('');
    const [calendar, setCalendar] = useState([])
    const [selectedDays, setSelectedDays] = useState({})

    const getProcedure = async() => {
        try {
            const { data } = await httpClient.get(apiUrls.procedures.getOne(id))

            if (data) {
                setName(data.name)
                setDescription(data.description)
                setCategory(data.categoryId)
                setFromDate(data.fromDate)
                setToDate(data.toDate)

                const a = {}
                for (const selectedDay in data.selectedDays) {

                    a[convert(selectedDay)] = [...data.selectedDays[selectedDay]]

                }

                setSelectedDays(a)
                const calendar = createCalendar(data.fromDate, data.toDate)

                setCalendar(calendar)
            }
        } catch (e) {
            notifiyErrors(e)
        } finally {
            setLoading(false)
        }
    }

    const handleCategoryChange = (event) => {
        setCategory(event.target.value);
    };

    const handleDescriptionChange = (event) => {
        setDescription(event.target.value);
    };

    const handleNameChange = (event) => {
        setName(event.target.value);
    };

    const getCategories = async() => {
        try {
            const { data } = await httpClient.get(apiUrls.categories.getAll)

            if (data) {
                setCategories(data.items)
            }
        } catch (e) {
            notifiyErrors(e)
        } finally {
            setLoading(false)
        }
    }

    const showCalendar = () => {
    }

    useEffect(() => {
        getCategories()
    }, [])

    useEffect(() => {
        getProcedure()
    }, [id])

    const handleEdit = async() => {
        try {
            const { data } = await httpClient.put(apiUrls.procedures.edit(id), {
                name,
                description,
                categoryId: category,
                fromDate,
                toDate,
                id
            })

            if (data) {
                toast.success("Tramite creada exitosamente!")
                navigate('/tramites')
            }
        } catch (e) {
            notifiyErrors(e)
        }
    }

    const onSelectDays = (day, hour) => {
        const updatedSelectedDays = {...selectedDays}
        const selectedDay = updatedSelectedDays[day]
        const index = selectedDay.indexOf(hour);
        if (index > -1) { // only splice array when item is found
            selectedDay.splice(index, 1)
        } else {
            selectedDay.push(hour)
        }
        updatedSelectedDays[day] = selectedDay
        setSelectedDays(updatedSelectedDays)
    }

    return (
        <Container>
            <Box sx={{ display: "flex"}}>
                <BackButton />
            </Box>
            <Header title="" action={handleEdit} actionLabel="Editar tramite"/>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: '15px'}}>
                <Box sx={{ display: 'flex', gap: '15px', width: '70%' }}>
                    <TextField
                        label="Name"
                        value={name}
                        sx={{ width: '70%'}}
                        onChange={handleNameChange}
                    />
                    <FormControl sx={{ width: '30%'}}>
                        <InputLabel id="demo-simple-select-label">Categoria</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={category}
                            label="Categoria"
                            disabled
                            onChange={handleCategoryChange}
                        >
                            {
                                categories.map(item => (
                                    <MenuItem key={uuidv4()} value={item.id}>{item.name}</MenuItem>
                                ))
                            }
                        </Select>
                    </FormControl>
                </Box>
                <TextField
                    label="Descripción"
                    value={description}
                    multiline
                    sx={{ width: '70%'}}
                    rows={2}
                    maxRows={4}
                    onChange={handleDescriptionChange}
                />
                <Box sx={{ display: 'flex', gap: '15px', width: '70%', alignItems: 'end'}}>
                    <Box sx={{ display: 'flex', gap: '15px', width: '70%' }}>
                        <DatePicker
                            label="Fecha inicio"
                            value={fromDate}
                            disabled
                            onChange={(newValue) => {
                                setFromDate(newValue);
                            }}
                            renderInput={(params) => <TextField {...params} />}
                        />
                        <DatePicker
                            label="Fecha fin"
                            value={toDate}
                            disabled
                            onChange={(newValue) => {
                                setToDate(newValue);
                            }}
                            renderInput={(params) => <TextField {...params} />}
                        />
                    </Box>
                    <Box sx={{ display: 'flex', justifyContent: 'center', height: 'fit-content'}}>
                        <Button onClick={showCalendar} disabled size="medium" variant="contained">Mostrar calendario</Button>
                    </Box>
                </Box>
                <Calendar calendar={calendar} isEdit selectedDays={selectedDays} handleSelectDays={onSelectDays}/>
            </Box>
        </Container>
    )
}

export default EditeProcedure
