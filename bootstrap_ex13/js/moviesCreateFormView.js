function createMovieFormView(list) {
    this.movieCreateForm= function (){
        let container = document.getElementById("toCreate"),
            template,
            newElement = document.createElement("div");

        moviesStore.LoadFromLocalStorage();

        template = ''
            + '<div class="form-container">'
            + '<form>'
            + '<h1>Dodaj nowy film</h1>'
            + '<div class="form-group">'
            + '<input type="text" name="title" />'
            + '<label class="control-label" for="title">Tytuł filmu</label><i class="bar"></i>'
            + '</div>'
            + '<div class="form-group">'
            + '    <input type="text" name="photo" />'
            + '    <label class="control-label" for="photo">Adres/nazwa zdjęcia</label><i class="bar"></i>'
            + '</div>'
            + '<div class="form-group">'
            + '    <input type="text" name="trailer" />'
            + '    <label class="control-label" for="trailer">Adres trailera</label><i class="bar"></i>'
            + '</div>'
            + '<div class="form-group">'
            + '    <input type="number" name="rate" min="0" max="5" />'
            + '    <label class="control-label" for="rate">Ocena od 1 do 5</label><i class="bar"></i>'
            + '</div>'
            + '<div class="form-group">'
            + '    <input type="text" name="descriptionlink" />'
            + '    <label class="control-label" for="descriptionlink">Link do pełnego opisu</label><i class="bar"></i>'
            + '</div>'
            + '<div class="form-group">'
            + '    <input type="text" name="desc" />'
            + '    <label class="control-label" for="desc">Krótki opis</label><i class="bar"></i>'
            + '</div>'
            + '<div class="form-group">'
            + '    <textarea name="fulldesc"></textarea>'
            + '    <label class="control-label" for="fulldesc">Pełny opis</label><i class="bar"></i>'
            + '</div>'
            + '</form>'
            + '<div class="button-container">'
            + '    <button id="moviecreatebutton" class="btn btn-light" type="button"><span>Submit</span></button>'
            + '</div>'
            + '</div>';

        newElement.innerHTML = template;
        container.appendChild(newElement);
        moviesStore.attachSaveButtonLisener();
    }
}
