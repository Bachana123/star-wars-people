import React, { useEffect, useState, useCallback } from 'react';
import {useNavigate} from 'react-router-dom';

import { debounce } from "lodash"

import { useAppSelector, useAppDispatch } from '../store/hooks'
import { fetchStarWarsPeople } from '../store/starWarsActions';

import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';

import { DataGrid, GridColDef } from "@mui/x-data-grid";
import Container from "@mui/material/Container";
import { Paper } from "@mui/material";
import Box from "@mui/material/Box";
import Skeleton from "@mui/material/Skeleton";

const columns = [
  { field: "name", headerName: "Name", minWidth: 300 },
  { field: "height", headerName: "Height", flex: 0.5},
  { field: "skin_color", headerName: "skin color", flex: 0.5 },
  { field: "eye_color", headerName: "eye color", flex: 0.5 },
  { field: "birth_year", headerName: "birth year", flex: 0.5 },
  { field: "gender", headerName: "gender", flex: 0.5 }
];

const LoadingSkeleton = () => (
  <Box
    sx={{
      height: "max-content"
    }}
  >
    {[...Array(10)].map((item, index) => (
      <Skeleton key={index} variant="rectangular" sx={{ my: 4, mx: 1 }} />
    ))}
  </Box>
);

function StarWarsPeople() {
    const dispatch = useAppDispatch()
    const navigate = useNavigate();
    const [activePage, setActivePage] = useState(1);
    const [searchKey, setSearchKey] = useState('');
    const starWarsPeople = useAppSelector((state) => state.starWarsPeople.people);
    const countOfPeople = useAppSelector((state) => state.starWarsPeople.countOfPeople);
  
    const handleChangePage = (event: React.ChangeEvent<unknown>, page: number) => {
      setActivePage(page);
      dispatch(fetchStarWarsPeople({page, search: searchKey}))
    }
  
    const debouncedSearch = debounce((searchKey: string) => {
      setSearchKey(searchKey)
      dispatch(fetchStarWarsPeople({page: 1, search: searchKey}))
    }, 300);

    const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
      debouncedSearch(event.target.value)
    }

    const handleClick = useCallback((event: any) => {
      const personId = event.row.url.split('/').filter((item: string) => item).pop();
      return navigate(`/person/${personId}`)
    }, [navigate])

    useEffect(() => {
      dispatch(fetchStarWarsPeople({page: 1}))
    }, [])
  
    return (
      <div className="App">
        <TextField id="outlined-basic" label="Search Star Wars People" variant="outlined" onChange={handleSearch} />
        <Container maxWidth="lg">
          <Box
            sx={{
              my: 4,
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center"
            }}
          >
            <Paper sx={{ width: "100%", height: "600px" }}>
              <DataGrid
                rows={starWarsPeople}
                columns={columns}
                getRowId={(row) => row.name}
                autoHeight
                hideFooter
                components={{
                  LoadingOverlay: LoadingSkeleton
                }}
                loading={starWarsPeople.length ? false : true}
                sx={{minHeight: 600,}}
                getRowClassName={(params) => `star-wars-people-gender__${params.row.gender === 'n/a' ? 'other' : params.row.gender }`}
                onRowClick={(event) => handleClick(event)}
              />
            </Paper>
          </Box>
        </Container>
        <div className="app__pagination">
          <Stack spacing={2}>
            <Pagination count={countOfPeople} variant="outlined" color="primary" onChange={handleChangePage} />
          </Stack>
        </div>
      </div>
    );
  }

export default StarWarsPeople;