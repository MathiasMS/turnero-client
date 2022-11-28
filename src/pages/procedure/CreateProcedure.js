import React, { useState, useEffect } from 'react'
import { Box, Container, FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import BackButton from '../../components/BackButton';
import Header from '../../components/Header';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { apiUrls, httpClient } from '../../utils/client';
import notifiyErrors from '../../utils/notifiyErrors';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { convert, createCalendar } from '../../utils/date';
import Calendar from './Calendar';

const CreateProcedure = () => {
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
    const [createLoading, setCreateLoading] = useState(false);

    const [categoryQuota, setCategoryQuota] = useState(null)

    const handleCategoryChange = (event) => {
        const categoryId = event.target.value
        setCategory(categoryId);
        const selectedCategory = categories.find(x => x.id === categoryId)
        setCategoryQuota(selectedCategory.fraction)
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
               setCategories(data)
            }
        } catch (e) {
            notifiyErrors(e)
        } finally {
            setLoading(false)
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

    const showCalendar = () => {
        const calendar = createCalendar(fromDate, toDate, categoryQuota)

        const selectedDays = {}

        calendar.forEach(c => {
            selectedDays[c.day] = [...c.hours]
        })

        setSelectedDays(selectedDays)
        setCalendar(calendar);
    }

    useEffect(() => {
        getCategories()
    }, [])

    const handleCreate = async() => {
        try {
            setCreateLoading(true)
            const { data } = await httpClient.post(apiUrls.procedures.create, {
                name,
                description,
                categoryId: category,
                fromDate,
                toDate,
                selectedDays
            })

            if (data) {
                toast.success("Tramite creada exitosamente!")
                navigate('/tramites')
            }
        } catch (e) {
            notifiyErrors(e)
        } finally {
            setCreateLoading(false)
        }
    }

    return (
        <Container>
            <Box sx={{ display: "flex"}}>
                <BackButton />
            </Box>
            <Header title="Tramite nuevo" action={handleCreate} actionDisabled={createLoading} actionLabel={createLoading ? "Creando.." : "Crear tramite" }/>
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
                            disabled={loading}
                            onChange={handleCategoryChange}
                        >
                            {
                                categories.map(item => (
                                    <MenuItem key={item.name} value={item.id}>{item.name}</MenuItem>
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
                            onChange={(newValue) => {
                                setFromDate(newValue);
                            }}
                            renderInput={(params) => <TextField {...params} />}
                        />
                        <DatePicker
                            label="Fecha fin"
                            value={toDate}
                            onChange={(newValue) => {
                                setToDate(newValue);
                            }}
                            renderInput={(params) => <TextField {...params} />}
                        />
                    </Box>
                    <Box sx={{ display: 'flex', justifyContent: 'center', height: 'fit-content'}}>
                        <Button onClick={showCalendar} size="medium" disabled={!categoryQuota || !fromDate || !toDate} variant="contained">Mostrar calendario</Button>
                    </Box>
                </Box>
                <Calendar calendar={calendar} selectedDays={selectedDays} handleSelectDays={onSelectDays}/>
            </Box>
        </Container>
    )
}

export default CreateProcedure
