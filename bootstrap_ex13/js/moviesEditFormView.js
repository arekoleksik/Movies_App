function editFormView(list) {
    this.movieEditForm = function () {
        let container = document.getElementById("toEdit"),
            template,
            newElement = document.createElement("div");
        moviesStore.LoadFromLocalStorage();

        template = ''
            + '<div class="form-container">'
            + '  <form>'
            + '    <h1>Edytuj film </h1>'
            + '    <div class="form-group">'
            + '      <select id ="listToEdit" name="movie">'
            + '        <option>--- WYBIERZ ---</option>'
            + '      </select>'
            + '      <label class="control-label" for="select">Wybierz film do edycji</label><i class="bar"></i>'
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
            + '    <textarea name="desc"></textarea>'
            + '    <label class="control-label" for="desc">Krótki opis</label><i class="bar"></i>'
            + '</div>'
            + '<div class="form-group">'
            + '    <textarea name="largedescription"></textarea>'
            + '    <label class="control-label" for="largedescription">Pełny opis</label><i class="bar"></i>'
            + '</div>'
            + '    </div>      '
            + '  </form>'
            + '  <div class="button-container">'
            + '    <button id="movieEditButton" class="btn btn-light" type="button"><span>Zapisz</span></button>'
            + '  </div>'
            + '</div>';
        container.classList.add("col-xs-6", 'col-sm-6', "col-md-4");
        newElement.innerHTML = template;
        container.appendChild(newElement);
        for (let i in list) {
            let newOption = document.createElement("option"),
                select = document.getElementById("listToEdit");
            newOption.innerHTML = list[i].name;
            select.appendChild(newOption);
        }
        moviesStore.fillEditForm();
    }
}
