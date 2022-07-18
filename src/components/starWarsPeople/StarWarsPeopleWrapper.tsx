import React, {useCallback} from 'react';
import {useNavigate} from 'react-router-dom';

import type { StarWarsPeopleItem as StarWarsPeopleType } from '../../types'

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import './starWars.css'

interface StarWarsPeopleWrapperProps {
    starWarsPeople: StarWarsPeopleType[];
}

const StarWarsPeopleWrapper = (props: StarWarsPeopleWrapperProps) => {
    const navigate = useNavigate();

    const genderColor = (gender: 'male' | 'female' | 'n/a') => {
        return gender === 'male' ? '#009aff' : gender === 'female' ? 'pink' : 'gray';
    }

    const handleClick = useCallback((event: React.MouseEvent<HTMLTableRowElement, MouseEvent>, url: string) => {
        const personId = url.split('/').filter(item => item).pop();
        return navigate(`/person/${personId}`)
    }, [navigate])

    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                <TableRow>
                    <TableCell>Name:</TableCell>
                    <TableCell align="right">height:</TableCell>
                    <TableCell align="right">hair color:</TableCell>
                    <TableCell align="right">skin color:</TableCell>
                    <TableCell align="right">eye color:</TableCell>
                    <TableCell align="right">birth year:</TableCell>
                    <TableCell align="right">gender:</TableCell>
                </TableRow>
                </TableHead>
                <TableBody>
                {props.starWarsPeople.map((item, index) => (
                    <TableRow
                        className="table-list__item"
                        style={{backgroundColor: genderColor(item.gender)}}
                        key={item.name}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        onClick={(event) => handleClick(event, item.url)}
                    >
                        <TableCell component="th" scope="row">
                            {item.name}
                        </TableCell>
                        <TableCell align="right">{item.height}</TableCell>
                        <TableCell align="right">{item.hair_color}</TableCell>
                        <TableCell align="right">{item.skin_color}</TableCell>
                        <TableCell align="right">{item.eye_color}</TableCell>
                        <TableCell align="right">{item.birth_year}</TableCell>
                        <TableCell align="right">{item.gender}</TableCell>
                    </TableRow>
                ))}
                </TableBody>
            </Table>
        </TableContainer>
    )
}

export default StarWarsPeopleWrapper;