import React, { useState, useEffect } from 'react';

export default function rate() {
    const [movieData, setMovieData] = useState([]);
    const [isFetching, setIsFetching] = useState(false);

    async function getMovies() {
        const res = await fetch('/api/generateNine', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        const data = await res.json();
        setMovieData([...movieData, ...data]);
        setIsFetching(false);
    }

    useEffect(() => {
        getMovies();
    }, []);

    useEffect(() => {
        console.log(movieData);
    }, [movieData]);

    function handleScroll() {
        if (
            window.innerHeight + document.documentElement.scrollTop !==
            document.documentElement.offsetHeight ||
            isFetching
        ) {
            return;
        }
        setIsFetching(true);
    }

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        if (!isFetching) return;
        getMovies();
    }, [isFetching]);


const [upMovies, setUpMovies] = useState([])
const [downMovies, setDownMovies] = useState([])
 

function handleUp(key) {
    if (!upMovies.includes(movieData[key].id)) {
        setUpMovies([...upMovies, movieData[key].id]);
    }
    if (upMovies.includes(movieData[key].id)) {
        var removeUp = upMovies.indexOf(movieData[key].id);
        setUpMovies([...upMovies.slice(0, removeUp), ...upMovies.slice(removeUp + 1)]);
    }
    
    if (downMovies.includes(movieData[key].id)) {
        var downIndex = downMovies.indexOf(movieData[key].id);
        setDownMovies([...downMovies.slice(0, downIndex), ...downMovies.slice(downIndex + 1)]);
    }
}

function handleDown(key) {
    if (!downMovies.includes(movieData[key].id)) {
        setDownMovies([...downMovies, movieData[key].id]);
    }
    if (downMovies.includes(movieData[key].id)) {
        var removeDown = downMovies.indexOf(movieData[key].id);
        setDownMovies([...downMovies.slice(0, removeDown), ...downMovies.slice(removeDown + 1)]);
    }
    
    if (upMovies.includes(movieData[key].id)) {
        var upIndex = upMovies.indexOf(movieData[key].id);
        setUpMovies([...upMovies.slice(0, upIndex), ...upMovies.slice(upIndex + 1)]);
    }
}
   
    useEffect(() => {
      console.log(upMovies)
    }, [upMovies])
       
    useEffect(() => {
        console.log(downMovies)
      }, [downMovies])

    return (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px', fontFamily: 'Arial, sans-serif' }}>
            {movieData &&
                Object.keys(movieData).map((key) => (
                    <div key={key} style={{ border: '1px solid black', padding: '40px' }}>
                        <h2 style={{ fontSize: '24px', fontWeight: 'bold', margin: '0' }}>{movieData[key].title}</h2>
                        {!upMovies.includes(movieData[key].id) && <button onClick={() => handleUp(key)}>Up</button>}
                        {upMovies.includes(movieData[key].id) && <button style={{color: 'green'}} onClick={() => handleUp(key)}>Up</button>}
                        {!downMovies.includes(movieData[key].id) && <button onClick={() => handleDown(key)}>Down</button>}
                        {downMovies.includes(movieData[key].id) && <button style={{color: 'red'}} onClick={() => handleDown(key)}>Down</button>}
                        <img
                            draggable={false}
                            src={process.env.NEXT_PUBLIC_TMDB_IMAGEBASEURL + movieData[key].poster_path}
                            style={{
                                width: "100%",
                                margin: "20px 0",

                            }}
                            alt={movieData[key].title}

                            onClick={(event) => {
                                if (event.button === 0) {
                                    // left click
                                }
                            }}
                            onContextMenu={(event) => {
                                event.preventDefault();
                                // right click

                            }}

                        />


                        <p style={{ fontSize: '16px', margin: '0' }}>{movieData[key].plot}</p>
                    </div>
                ))}
            {isFetching && <div style={{ fontSize: '20px' }}>Fetching more movies...</div>}
        </div>
    );
}