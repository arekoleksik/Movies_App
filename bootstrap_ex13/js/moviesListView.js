function createMoviesListView(list) {
    this.show = function () {
        let movies_container = document.getElementById("movies"),
            top_container = document.getElementById("top"),
            theworst_container = document.getElementById("theworst"),
            moviesKeys,
            counter = 0;

        moviesKeys = Object.keys(list);

        for (let i = 0; i < moviesKeys.length; i++) {
            let newElement = document.createElement("div"),
                selectedMovie = list[moviesKeys[i]],
                template,
                selectedMovieTrailer = selectedMovie.trailer_link,
                selectedMovieDescription = selectedMovie.description,
                selectedMovieLargeDescription = selectedMovie.largedescription,
                unixTimestamp = new Date();

            template = ''
                + '<div class="thumbnail">'
                + '  <div class="hovereffect">'
                + '   <img src=' + selectedMovie.thumbnail + ' alt=' + selectedMovie.name + '>'
                + '      <div class="overlay">'
                + '          <a class="info" href="#" data-toggle="modal" data-target="#myModal" class="info"  onclick="moviesStore.VideoModal(\'' + selectedMovieTrailer + '\',\'' + selectedMovieDescription + '\',\'' + selectedMovieLargeDescription + '\')">zobacz trailer</a>'
                + '      </div>'
                + '  </div>'
                + '  <div class="caption">'
                + '      <h3>' + selectedMovie.name + '</h3>'
                + '      <p>' + selectedMovie.description + '</p>'
                + '      <p><a href=' + selectedMovie.movie_link + ' class="btn btn-primary" role="button" target="_blank">IMBD.COM</a></p>'
                + '      </br>'
                + '       <p>Ocena:</p>'
                + '       <div class="stars">'
                + '           <span class="glyphicon glyphicon-star" aria-hidden="true"></span>'.repeat(selectedMovie.rating)
                + '       <p> Dodano: ' + unixTimestamp.getDate() + '-' + (1 + unixTimestamp.getMonth()) + '-' + unixTimestamp.getFullYear() + '</p>'
                + '       </div>'
                + '</div>'
                + '</div>';
            newElement.innerHTML += template;

            switch (selectedMovie.section) {
                case "best_movie":
                    newElement.classList.add("col-xs-6", "col-xs-offset-3", 'col-sm-6', "col-sm-offset-2", "col-md-2");
                    top_container.appendChild(newElement);
                    break;
                case "default_movie":
                    if (counter === 0 || counter % 4 === 0) {
                        newElement.classList.add("col-xs-6", "col-xs-offset-3", 'col-sm-6', "col-sm-offset-0", "col-md-2")
                    } else {
                        newElement.classList.add("col-xs-6", "col-xs-offset-3", 'col-sm-6', "col-sm-offset-0", "col-md-2")
                    }
                    movies_container.appendChild(newElement);
                    counter += 1;
                    break;
                case "worst_movie":
                    newElement.classList.add("col-xs-6", "col-xs-offset-3", 'col-sm-6', "col-sm-offset-0", "col-md-2");
                    theworst_container.appendChild(newElement);
                    break;
            }
        }
    }
}
