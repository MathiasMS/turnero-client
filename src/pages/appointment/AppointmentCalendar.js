import { useState} from 'react'
import moment from 'moment'
import { Box, Button } from '@mui/material'
import { v4 as uuidv4 } from 'uuid';
import Modal from '../../components/Modal';
import ConfirmAppointment from '../../components/modals/ConfirmAppointment';
import 'moment/locale/es'  // without this line it didn't work
moment.locale('es')

const colorMap = {
    '#F6F9FD': {
        false: 'white',
        true: '#F6F9FD'
    },
    'white': {
        false: '#F6F9FD',
        true: 'white',
    }
}

const EmptyRows = ({differences, date, starterColor}) => {

    return [...Array(differences)].map((u, i) => (
        <Box key={uuidv4()} sx={{ p: 3, backgroundColor: colorMap[starterColor][i % 2 === 0], borderBottom: '1px solid rgb(224, 224, 224)', height: '36.5px'}} />
    ))

}

const AppointmentCalendar = ({ calendar, onSuccess, procedure }) => {
    const [open, setOpen] = useState(false)
    const maxQuantityOfHours = Math.max(...calendar.map(c => c.hours.length))
    const [content, setContent] = useState(null)

    const onClose = () => {
        setOpen(false)
    }

    const onClickAppointment = (date, hour) => {
        setOpen(true)
        setContent(<ConfirmAppointment onClose={onClose} date={date} onSuccess={onSuccess} hour={hour} procedure={procedure} />)
    }

    return (
        <Box sx={{ display: 'flex', mt: 3}}>
            {
                calendar.map(day => {
                    const { date, hours } = day

                    return (
                        <Box key={uuidv4()} sx={{ display: 'flex', flexDirection: 'column'}}>
                            <Box sx={{ fontSize: '15px', fontWeight: 'bold', p: 3, borderBottom: '1px solid rgb(224, 224, 224)', width: '125px'}}>
                                {moment(date).format("LL")}
                            </Box>
                            {
                                hours.map((hour, index) => (
                                    <Box key={uuidv4()} sx={{ p: 3, backgroundColor: index % 2 === 0 ? '#F6F9FD' : 'white', borderBottom: '1px solid rgb(224, 224, 224)'}}>
                                        <Button  variant="contained" onClick={() => onClickAppointment(date, hour)}>
                                            {hour}
                                        </Button>
                                    </Box>
                                ))
                            }
                            <EmptyRows differences={maxQuantityOfHours - hours.length} date={date} starterColor={hours.length % 2 === 0 ? '#F6F9FD' : 'white'}/>
                        </Box>
                    )
                })
            }
            <Modal
                open={open}
                setOpen={setOpen}
                title="Confirmar Turno"
                content={content}
            />
        </Box>
    )

}

export default AppointmentCalendar
