import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom'
import { useAppSelector, useAppDispatch } from '../store/hooks'
import { fetchStarWarsPerson } from '../store/starWarsActions';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

function StarWarsPerson() {
    const params = useParams();
    const dispatch = useAppDispatch();
    const starWarsPerson = useAppSelector((state) => state.starWarsPeople.starWarsPerson);

    useEffect(() => {
        if (params.personId) {
            dispatch(fetchStarWarsPerson(params.personId))
        }
    }, [])

    const genderPronoun = (gender: 'male' | 'female' | 'n/a' ) => {
        return gender === 'male' ? 'his' : gender === 'female' ? 'her' : 'its';
    }
    return (
        <>
        <Link className="go-back__button" to="/" >Go Back</Link>
        <Box sx={{ width: '100%', display: 'flex', alignItems: 'center', flexFlow: 'column' }}>
            <Typography variant="h1" component="div" gutterBottom>
                {starWarsPerson?.name}
            </Typography>
            <Typography variant="body1" gutterBottom>
                {starWarsPerson?.height && `${starWarsPerson?.name}s height is ${starWarsPerson?.height}. `}
                {starWarsPerson?.hair_color && `${starWarsPerson?.name} has ${starWarsPerson?.hair_color} hair. `}
                {starWarsPerson?.skin_color && `${genderPronoun(starWarsPerson?.gender)} skin color is ${starWarsPerson?.skin_color}. `}
                {starWarsPerson?.eye_color && `${genderPronoun(starWarsPerson?.gender)} eyes are ${starWarsPerson?.eye_color}. `}
            </Typography>
      </Box>
      </>
    );
}

export default StarWarsPerson;