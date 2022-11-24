import React from 'react';
import { Routes, Route } from "react-router-dom";
import Login from '../pages/authentication/Login';
import Register from '../pages/authentication/Register';
import ProtectedRoute from './ProtectedRoute';
import CategoriesList from '../pages/category/CategoriesList';
import ProcedureList from '../pages/procedure/ProcedureList';
import CreateProcedure from '../pages/procedure/CreateProcedure';
import EditProcedure from '../pages/procedure/EditProcedure';
import Appointment from '../pages/appointment/Appointment';

const AppRouter = () => {
    return (
        <Routes>
            <Route path="/login" element={<Login />}/>
            <Route path="/registro" element={<Register />}/>
            <Route path="/turnos" element={<Appointment />}/>

            <Route path="/categorias" element={
                <ProtectedRoute>
                    <CategoriesList />
                </ProtectedRoute>
            }/>

            <Route path="/tramites" element={
                <ProtectedRoute>
                    <ProcedureList />
                </ProtectedRoute>
            }/>

            <Route path="/tramites/crear" element={
                <ProtectedRoute>
                    <CreateProcedure />
                </ProtectedRoute>
            }/>

            <Route path="/tramites/editar/:id" element={
                <ProtectedRoute>
                    <EditProcedure />
                </ProtectedRoute>
            }/>

        </Routes>
    )
}

export default AppRouter
