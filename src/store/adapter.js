const adaptMovieToClient = (movie) => {
  const adaptedMovie = Object.assign(
      {},
      movie,
      {
        id: movie.id.toString(),
        posterImage: movie.poster_image,
        previewImage: movie.preview_image,
        backgroundImage: movie.background_image,
        backgroundColor: movie.background_color,
        scoresCount: movie.scores_count,
        runTime: movie.run_time,
        isFavorite: movie.is_favorite,
        videoLink: movie.video_link,
        previewVideoLink: movie.preview_video_link
      }
  );

  delete adaptedMovie.poster_image;
  delete adaptedMovie.preview_image;
  delete adaptedMovie.background_image;
  delete adaptedMovie.background_color;
  delete adaptedMovie.scores_count;
  delete adaptedMovie.run_time;
  delete adaptedMovie.is_favorite;
  delete adaptedMovie.video_link;
  delete adaptedMovie.preview_video_link;

  return adaptedMovie;
};

const adaptMoviesToClient = (movies) => movies.map((movie) => adaptMovieToClient(movie));

export {adaptMovieToClient, adaptMoviesToClient};
