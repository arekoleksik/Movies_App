function removeFormView(list) {
    this.movieRemoveForm = function () {
        let container = document.getElementById("toRemove"),
            template,
            newElement = document.createElement("div");
        moviesStore.LoadFromLocalStorage();
        template = ''
            + '<div class="form-container">'
            + '  <form>'
            + '    <h1>Usuń film </h1>'
            + '    <div class="form-group">'
            + '      <select id ="listToDelete" name="movie">'
            + '        <option>--- WYBIERZ ---</option>'
            + '      </select>'
            + '      <label class="control-label" for="select">Wybierz film do usunięcia</label><i class="bar"></i>'
            + '    </div>'
            + '  </form>'
            + '  <div class="button-container">'
            + '    <button id="movieRemoveButton" class="btn btn-light" type="button"><span>Usuń</span></button>'
            + '  </div>'
            + '</div>';
        container.classList.add("col-xs-6", 'col-sm-6', "col-md-4");
        newElement.innerHTML = template;
        container.appendChild(newElement);
        for (let i in list) {
            let newOption = document.createElement("option"),
                select = document.getElementById("listToDelete");
            newOption.innerHTML = list[i].name;
            select.appendChild(newOption);
        }
        moviesStore.attachRemoveButtonLisener();
    };
}
