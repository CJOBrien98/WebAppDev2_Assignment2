//  Dates for "Now Playing" handled by API automatically, depreciated check
/* 
const currentDate = new Date()
const year = currentDate.getFullYear();
const month = (currentDate.getMonth()+1);
const day = currentDate.getDate();
const lastMonth = currentDate.getMonth();
const currentDateString = year+"-"+month+"-"+day;
const monthAgo = year+"-"+lastMonth+"-"+day; 

*/

export const getMovies = () => {
  return fetch(
    `http://localhost:8080/api/movies/tmdb/movies`
  ).then((response) => {
    if (!response.ok) {
      return response.json().then((error) => {
        throw new Error(error.status_message || "Something went wrong");
      });
    }
    return response.json();
  })
    .catch((error) => {
      throw error
    });
};

export const getMovie = async (args) => {
  //console.log(args)
  const [, idPart] = args.queryKey;
  const { id } = idPart;
  const response = await fetch(
    `http://localhost:8080/api/movies/tmdb/movies/${id}`, {
      headers: {
      'Authorization': window.localStorage.getItem('token')
    }
  }
  );
    if (!response.ok) {
      return response.json().then((error) => {
        throw new Error(error.status_message || "Something went wrong");
      });
    }
    console.log(id)
    return response.json();
  }

export const getGenres = () => {
  return fetch(
    `http://localhost:8080/api/movies/tmdb/genres`
  ).then((response) => {
    if (!response.ok) {
      return response.json().then((error) => {
        throw new Error(error.status_message || "Something went wrong");
      });
    }
    return response.json();
  })
    .catch((error) => {
      throw error
    });
};

export const getMovieImages = (args) => {
  const [, idPart] = args.queryKey;
  const { id } = idPart;
  return fetch(
    `http://localhost:8080/api/movies/tmdb/${id}/images`
  ).then((response) => {
    if (!response.ok) {
      return response.json().then((error) => {
        throw new Error(error.status_message || "Something went wrong");
      });
    }
    return response.json();
  })
    .catch((error) => {
      throw error
    });
};

export const getMovieReviews = (args) => {
  const [, idPart] = args.queryKey;
  const { id } = idPart;
  return fetch(
    `http://localhost:8080/api/movies/tmdb/movies/${id}/reviews`
  ).then((response) => {
    if (!response.ok) {
      return response.json().then((error) => {
        throw new Error(error.status_message || "Something went wrong");
      });
    }
    return response.json();
  })
    .catch((error) => {
      throw error
    });
};

export const getUpcomingMovies = async () => {
  const response = await fetch(
    `http://localhost:8080/api/movies/tmdb/upcoming`, {
    headers: {
      'Authorization': window.localStorage.getItem('token')
    }
  }
  );
    if (!response.ok) {
      return response.json().then((error) => {
        throw new Error(error.status_message || "Something went wrong");
      });
    }
    return response.json();
  }

export const getNowPlayingMovies = () => {
  return fetch(
    `http://localhost:8080/api/movies/tmdb/now_playing`
  ).then((response) => {
    //console.log(currentDateString);
    //console.log(monthAgo);
    if (!response.ok) {
      return response.json().then((error) => {
        throw new Error(error.status_message || "Something went wrong");
      });
    }
    return response.json();
  })
    .catch((error) => {
      throw error
    });
};

export const getPopularMovies = () => {
  return fetch(
    `http://localhost:8080/api/movies/tmdb/popular`
  ).then((response) => {
    if (!response.ok) {
      return response.json().then((error) => {
        throw new Error(error.status_message || "Something went wrong");
      });
    }
    return response.json();
  })
    .catch((error) => {
      throw error
    });
};

export const getRecommended = (args) => {
  const [, idPart] = args.queryKey;
  const { id } = idPart;
  return fetch(
    `http://localhost:8080/api/movies/tmdb/movies/${id}/recommended`
  ).then((response) => {
    if (!response.ok) {
      return response.json().then((error) => {
        throw new Error(error.status_message || "Something went wrong");
      });
    }
    return response.json();
  })
    .catch((error) => {
      throw error
    });
};

  export const login = async (username, password) => {
    const response = await fetch('http://localhost:8080/api/users', {
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'post',
        body: JSON.stringify({ username: username, password: password })
    });
    return response.json();
};

export const signup = async (username, password) => {
    const response = await fetch('http://localhost:8080/api/users?action=register', {
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'post',
        body: JSON.stringify({ username: username, password: password })
    });
    return response.json();
};

