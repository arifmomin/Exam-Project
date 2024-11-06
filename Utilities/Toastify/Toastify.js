import {Bounce, toast } from 'react-toastify';

const SuccessToast = (message = "Something is happening" , position = "top-right", delay = 3000) =>{
    toast.success(message, {
        position: position,
        autoClose: delay,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
        });
};
const infoToast = (message = "Something is happening" , position = "top-center", delay = 4000) =>{
    toast.info(message, {
        position: position,
        autoClose: delay,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
        });
};
const ErrorToast = (message = 'Something is happening' , position = 'top-right', delay = 4000) =>{
    toast.error(message, {
        position: position,
        autoClose: delay,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
        });
};
console.log('amr nme');

export { SuccessToast, infoToast, ErrorToast};
