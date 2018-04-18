const moviesListController = {
    start: function (list) {
        let view;
        view = new createMoviesListView(list);
        view.show();
    },
    remove: function (list) {
        let removeView;
        removeView = new removeFormView(list);
        removeView.movieRemoveForm();
    },
    add: function (list) {
        let addingView;
        addingView = new createMovieFormView(list);
        addingView.movieCreateForm();
    },
    edit: function (list) {
        let editView;
        editView = new editFormView(list);
        editView.movieEditForm();
    }
};

function getActionFromUrl(action) {
    let pageUrl = window.location.href,
        name = action,
        regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(pageUrl);

    if (!results || !results[2]) return;
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}

function start() {
    let reuestedAction = getActionFromUrl("action");
    moviesStore.LoadFromLocalStorage();
    switch (reuestedAction) {
        case "RemoveMovie":
            moviesListController.remove(moviesStore.getMoviesList());
            break;
        case "CreateMovie":
            moviesListController.add(moviesStore.getMoviesList());
            break;
        case "Edit":
            moviesListController.edit(moviesStore.getMoviesList());
            break;
        default:
            moviesListController.start(moviesStore.getMoviesList());
    }
}

let moviesStore = new Store();
start();
