import { toast } from 'react-toastify';

export default function (error) {
    const message = error.response.data.message
    toast.error(message)
}
