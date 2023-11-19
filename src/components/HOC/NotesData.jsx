import React from 'react'
import {useGetNotesQuery, useGetUserMutation } from '../../features/api/apiSlice';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { Navigate } from 'react-router-dom';
import { userIdState, userInfo } from '../../features/createslice/userSlice';
import { useEffect } from 'react';

const NotesData = (Component) => {

    const NewComponent = () => {
        const dispatch = useDispatch();
        const [getUser] = useGetUserMutation();
        const token = localStorage.getItem('jwtToken');
        useEffect(() => {
            getUser(token).then(data =>{
                dispatch(userIdState(data?.data?._id));
                dispatch(userInfo(data.data));
              }).catch(err =>{
                console.log(err);
              });
        }, [token])
        
        const userid = useSelector((state) => state.toggle.userid);
        const { data, isLoading } = useGetNotesQuery(userid);
        if (token ) {
          return <Component data={data} loading={isLoading} />
        } else {
            toast.success('Please Login First..', {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            });
           return <Navigate to='/' />
        }


    }

    return NewComponent
}

export default NotesData;