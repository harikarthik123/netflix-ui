import React from 'react'
import CardSlider from './CardSlider'
import styled from "styled-components";

export default function Slider({ movies }) {

    const getMoviesFromRange = (from, to) => {
        return movies.slice(from, to)
    }
    return (
        <Container>
            <CardSlider title="Trending Now" data={getMoviesFromRange(0, 10)} />
            <CardSlider title="New Releases" data={getMoviesFromRange(10, 20)} />
            <CardSlider title="BlockBuster Movies" data={getMoviesFromRange(20, 30)} />
            <CardSlider title="Popular On Netflix" data={getMoviesFromRange(30, 40)} />
            <CardSlider title="Action Movies" data={getMoviesFromRange(40, 50)} />
            <CardSlider title="Epics" data={getMoviesFromRange(50, 60)} />
            <CardSlider title="Comedy Movies" data={getMoviesFromRange(60, 70)} />
            <CardSlider title="Romantic Movies" data={getMoviesFromRange(70, 80)} />
            <CardSlider title="Sci-Fi Movies" data={getMoviesFromRange(80, 90)} />
            <CardSlider title="Horror Movies" data={getMoviesFromRange(90, 100)} />
        </Container>
    )
}

const Container = styled.div`
  position: relative;
  margin-top: -8rem;
`;
