function Store() {
    let list = {};

    this.createMovie = createMovie;
    this.getMoviesList = getMoviesList;
    this.SaveToLocalStorage = SaveToLocalStorage;
    this.LoadFromLocalStorage = LoadFromLocalStorage;
    this.ClearAllMoviesData = ClearAllMoviesData;
    this.SetEmptyInfo = SetEmptyInfo;
    this.loadDemo = _createMockData;
    this.VideoModal = VideoModal;
    this.removeMovie = removeMovie;
    this.attachRemoveButtonLisener = attachRemoveButtonLisener;
    this.attachSaveButtonLisener = attachSaveButtonLisener;
    this.fillEditForm = fillEditForm;

    function createMovie(name, rating, thumbnail, movie_link, description, trailer_link, largedescription, section) {
        list[name] = new Movie(name, rating, thumbnail, movie_link, description, trailer_link, largedescription, section);
        SaveToLocalStorage();
    }

    function SaveToLocalStorage() {
        const moviesToString = JSON.stringify(list);
        localStorage.setItem("moviesList", moviesToString);
    }

    function LoadFromLocalStorage() {
        const moviesList = localStorage.getItem('moviesList'),
            stringToObject = JSON.parse(moviesList);
        if (!stringToObject) {
            SetEmptyInfo();
            return {}
        }
        list = stringToObject;
    }

    function ClearAllMoviesData() {
        let userDecision = confirm("Hejka, czy serio chcesz usunac?");

        if (userDecision) {
            localStorage.setItem("moviesList", "{ }");
            _reloadPage();
        }
    }

    function removeMovie(name) {
        for (let i in list) {
            if (name === list[i].name) delete list[i];
        }
        SaveToLocalStorage();
    }

    function attachRemoveButtonLisener() {
        let removeButton = document.getElementById("movieRemoveButton");
        removeButton.addEventListener("click", function () {
            let form = document.forms[0],
                movieName = form.movie.value,
                select = document.getElementById("listToDelete");
            removeMovie(movieName);
            select.remove(select.selectedIndex);
        });
    }

    function attachSaveButtonLisener() {
        let savebutton = document.getElementById("moviecreatebutton");
        savebutton.addEventListener("click", function () {
            let form = document.forms[0];
            if (form.title.value !== "") {
                createMovie(form.title.value, form.rate.value, form.photo.value, form.descriptionlink.value, form.desc.value, form.trailer.value, form.fulldesc.value, section="default_movie");
            }
            else {
                alert("nalezy podac tytuł!")
            }
            SaveToLocalStorage();
            window.location.href = "index.html?action=CreateMovie";
        })
    }

    function fillEditForm() {
        let movieToEdit = document.getElementById("listToEdit"),
            movieEditButton = document.getElementById("movieEditButton"),
            form = document.forms[0];

        movieToEdit.addEventListener("change", function () {
            let movieName = form.movie.value;
            for (let i in list) {
                if (list[i].name === movieName) {
                    form.title.value = list[i].name;
                    form.photo.value = list[i].thumbnail;
                    form.trailer.value = list[i].trailer_link;
                    form.rate.value = list[i].rating;
                    form.descriptionlink.value = list[i].movie_link;
                    form.desc.value = list[i].description;
                    form.largedescription.value = list[i].largedescription;
                }
            }
        });
        movieEditButton.addEventListener("click", function () {
            let movieName = form.movie.value;

            for (let i in list) {
                if (list[i].name === movieName) {
                    list[i].name = form.title.value;
                    list[i].thumbnail = form.photo.value;
                    list[i].trailer_link = form.trailer.value;
                    list[i].rating = form.rate.value;
                    list[i].movie_link = form.descriptionlink.value;
                    list[i].description = form.desc.value;
                    list[i].largedescription = form.largedescription.value;
                }
            }
            SaveToLocalStorage();
            _reloadPage();
        })
    }

    function _reloadPage() {
        window.location.href = "index.html";
    }

    function getMoviesList() {
        return list;
    }

    function SetEmptyInfo() {
        let element = document.getElementById('nothingcreatedmessage');
        element.innerHTML = '<h1>Nic nie zostało jeszcze utworzone</h1>';
    }

    function VideoModal(movie, dscrp, ldscp) {
        let frame = document.querySelector('iframe'),
            descriprion = document.getElementById('modaldescription'),
            MoreInfo = document.getElementById("MoreInfo");
        frame.setAttribute('src', movie);
        descriprion.innerHTML = dscrp;
        MoreInfo.addEventListener("click", function () {
            descriprion.innerHTML = ldscp;
        });
        $("#myModal").on('hidden.bs.modal', function (e) {
            $("#myModal iframe").attr("src", $("#myModal iframe").attr("src"));
        });
    }

    function _createMockData() {
        let movies = [];

        movies.push(suburbicon = {
            name: 'SUBURBICON',
            rating: 3,
            thumbnail: "https://media.multikino.pl/thumbnails/50/rc/RTMwRDk1/eyJ0aHVtYm5haWwiOnsic2l6ZSI6WyIzMTkiLCI0NzIiXSwibW9kZSI6Imluc2V0In19/uploads/images/films_and_events/suburbicon-pl_f6606c31bf.jpg",
            movie_link: "http://www.imdb.com/title/tt0491175/",
            section: "best_movie",
            description: 'In the bosom of Suburbicon, a family-centred, all-white utopia of manicured lawns ... ',
            trailer_link: "https://www.youtube.com/embed/cBezc1S1BAQ",
            largedescription: "In the bosom of Suburbicon, a family-centred, all-white utopia of manicured lawns and friendly locals, a simmering tension is brewing, as the first African-American family moves in the idyllic community, in the hot summer of 1959. However, as the patriarch Gardner Lodge and his family start catching a few disturbing glimpses of the once welcoming neighbourhoods dark underbelly, acts of unprecedented violence paired with a gruesome death will inevitably blemish Suburbicons picture-perfect facade. Who would have thought that darkness resides even in Paradise?"
        });

        movies.push(kryptonim = {
            name: 'KRYPTONIM HHHH',
            rating: 4,
            thumbnail: "https://media.multikino.pl/thumbnails/50/rc/RUFENkUy/eyJ0aHVtYm5haWwiOnsic2l6ZSI6WyIzMTkiLCI0NzIiXSwibW9kZSI6Imluc2V0In19/uploads/images/films_and_events/kryptonim-hhhh-pl_fdd1fd09ad.jpg",
            movie_link: "http://www.imdb.com/title/tt3296908/?ref_=fn_al_tt_1",
            section: "best_movie",
            description: '1942: The Third Reich is at its peak. The Czech resistance in London decides to plan the most ambitious...',
            trailer_link: "https://www.youtube.com/embed/TcKm2g9r2po",
            largedescription: 'The Third Reich is at its peak. The Czech resistance in London decides to plan the most ambitious military operation of WWII: Anthropoid. Two young recruits in their late twenties, Jozef Gabcik and Jan Kubis, are sent to Prague to assassinate the most ruthless Nazi leader - Reich-protector Reinhard Heydrich, Head of the SS, the Gestapo, and the architect of the Final Solution.'
        });

        movies.push(slumber = {
            name: 'SLUMBER',
            rating: 4,
            thumbnail: "https://media.multikino.pl/thumbnails/50/rc/NzUzMENB/eyJ0aHVtYm5haWwiOnsic2l6ZSI6WyIzMTkiLCI0NzIiXSwibW9kZSI6Imluc2V0In19/uploads/images/films_and_events/slumber-pl_30dbd3a10c.jpg",
            movie_link: "http://www.imdb.com/title/tt5181852/?ref_=nv_sr_3",
            section: "best_movie",
            description: 'A sleep doctor tries to protect a family from a demon that feeds on people in their nightmares.',
            trailer_link: "https://www.youtube.com/embed/2ACktbmscxg",
            largedescription: 'Alice is a rational-minded sleep doctor, haunted by the mysterious nocturnal death of her younger brother. Whilst performing a routine examination on a traumatized family with sleeping problems, Alice is attacked by the father in his sleep. The father is arrested and blamed for causing the familys sleep issues, but when he is thrown into jail and the problems get progressively worse, Alice is forced to abandon scientific rationale and accept that the family is being terrorized by a parasitic demon who feeds on the weak whilst they sleep: the Night Hag. In order to defeat the dark spirit who was also responsible for her brothers death, Alice must journey into her own nightmares and confront her childhood demons.'
        });

        movies.push(thor = {
            name: 'THOR',
            rating: 3,
            thumbnail: "https://media.multikino.pl/thumbnails/50/rc/MDZCRkMz/eyJ0aHVtYm5haWwiOnsic2l6ZSI6WyIzMTkiLCI0NzIiXSwibW9kZSI6Imluc2V0In19/uploads/images/films_and_events/thor-ragnarok-pl2_57186b1cf4.jpg",
            movie_link: "http://www.imdb.com/title/tt3501632/?ref_=nv_sr_1",
            section: "default_movie",
            description: 'Prisoned, the almighty Thor finds himself in a lethal gladiatorial contest against the Hulk, his former ally.',
            trailer_link: "https://www.youtube.com/embed/ue80QwXMRHg",
            largedescription: 'Thor is imprisoned on the other side of the universe and finds himself in a race against time to get back to Asgard to stop Ragnarok, the destruction of his homeworld and the end of Asgardian civilization, at the hands of an all-powerful new threat, the ruthless HelaImprisoned on the other side of the universe, the mighty Thor finds himself in a deadly gladiatorial contest that pits him against the Hulk, his former ally and fellow Avenger. Thors quest for survival leads him in a race against time to prevent the all-powerful Hela from destroying his home world and the Asgardian civilization.'
        });

        movies.push(liga = {
            name: 'JUSTICE LEAGUE',
            rating: 3,
            thumbnail: "https://media.multikino.pl/thumbnails/50/rc/OTFGOEJB/eyJ0aHVtYm5haWwiOnsic2l6ZSI6WyIzMTkiLCI0NzIiXSwibW9kZSI6Imluc2V0In19/uploads/images/films_and_events/liga-sprawiedliwosci-pl_a2461ed253.jpg",
            movie_link: "http://www.imdb.com/title/tt0974015/?ref_=nv_sr_1",
            section: "default_movie",
            description: 'Fueled by his restored faith in humanity and inspired by Supermans selfless act',
            trailer_link: "https://www.youtube.com/embed/6FhED-m8PxQ",
            largedescription: 'Fueled by his restored faith in humanity and inspired by Supermans selfless act, Bruce Wayne enlists the help of his newfound ally, Diana Prince, to face an even greater enemy. Together, Batman and Wonder Woman work quickly to find and recruit a team of metahumans to stand against this newly awakened threat. But despite the formation of this unprecedented league of heroes-Batman, Wonder Woman, Aquaman, Cyborg and The Flash-it may already be too late to save the planet from an assault of catastrophic proportions.In the wake of Clark Kent Supermans death at the hands of Doomsday in BvS , vigilante Bruce Wayne Batman reevaluates his extreme methods and begins reaching out to extraordinary heroes to assemble a team of crime fighters to defend earth from all kinds of threats. They face off against Steppenwolf, the herald and second in command to alien warlord Darkseid , who is charged by Darkseid with hunting down three artifacts hidden on Earth.'
        });

        movies.push(star_wars = {
            name: 'GWIEZDNE WOJNY',
            rating: 4,
            thumbnail: "https://media.multikino.pl/thumbnails/50/rc/NDZBRjEw/eyJ0aHVtYm5haWwiOnsic2l6ZSI6WyIzMTkiLCI0NzIiXSwibW9kZSI6Imluc2V0In19/uploads/images/films_and_events/star-wars-plakat_5d0f4cd42d.jpg",
            movie_link: "http://www.imdb.com/title/tt2527336/?ref_=nv_sr_3",
            section: "default_movie",
            description: 'Having taken her first steps into the Jedi world, Rey joins Luke Skywalker on an adventure with Leia',
            trailer_link: "https://www.youtube.com/embed/Zl2_-ayidbw",
            largedescription: 'Having taken her first steps into the Jedi world, Rey joins Luke Skywalker on an adventure with Leia, Finn and Poe that unlocks mysteries of the Force and secrets of the past.No one can say that Star Wars: The Last Jedi is a previous entry in a different skin (the most commonly agreed-upon complaint with Star Wars: The Force Awakens was its lack of originality, opting to ape beat for beat the plot of A New Hope), as writer and director Rian Johnson (the sci-fi brainiac behind the greatness that'
        });

        movies.push(emotki = {
            name: 'EMOTKI. FILM',
            rating: 3,
            thumbnail: "https://media.multikino.pl/thumbnails/50/rc/MDJBNTdF/eyJ0aHVtYm5haWwiOnsic2l6ZSI6WyIzMTkiLCI0NzIiXSwibW9kZSI6Imluc2V0In19/uploads/images/films_and_events/emotki-film-pl2_7ff323a5ea.jpg",
            movie_link: "http://www.imdb.com/title/tt4877122/?ref_=nv_sr_1",
            section: "default_movie",
            description: 'Gene, a multi-expressional emoji, sets out on a journey to become a normal emoji.',
            trailer_link: "https://www.youtube.com/embed/1-ZArk73bLc",
            largedescription: 'The Emoji Movie unlocks the never-before-seen secret world inside your smartphone. Hidden within the messaging app is Textopolis, a bustling city where all your favorite emojis live, hoping to be selected by the phones user. In this world, each emoji has only one facial expression - except for Gene, an exuberant emoji who was born without a filter and is bursting with multiple expressions. Determined to become normal like the other emojis, Gene enlists the help of his handy best friend Hi-5 and the notorious code breaker emoji Jailbreak. Together, they embark on an epic app-venture through the apps on the phone, each its own wild and fun world, to find the Code that will fix Gene. But when a greater danger threatens the phone, the fate of all emojis depends on these three unlikely friends who must save their world before its deleted forever.'
        });

        movies.push(najlepszy = {
            name: 'NAJLEPSZY',
            rating: 3,
            thumbnail: "https://media.multikino.pl/thumbnails/50/rc/NzBEQzA3/eyJ0aHVtYm5haWwiOnsic2l6ZSI6WyIzMTkiLCI0NzIiXSwibW9kZSI6Imluc2V0In19/uploads/images/films_and_events/najlepszy-pl_e43638c185.jpg",
            movie_link: "http://www.imdb.com/title/tt6737766/?ref_=fn_al_tt_2",
            section: "default_movie",
            description: 'Nowy film reżysera kinowego hitu „Bogowie” - Łukasza Palkowskiego.',
            trailer_link: "https://www.youtube.com/embed/oXaw9kI0olI",
            largedescription: 'Nowy film reżysera kinowego hitu „Bogowie” - Łukasza Palkowskiego. Twórca tym razem znów sięga po życiorys niezwykłej osoby. Człowieka, który udowodnił, że prawdziwi bohaterowie nie boją się upadać i potrafią podnieść się z największego dna. Głównym bohaterem filmu „Najlepszy” jest sportowiec, który zachwycił świat, a który w Polsce, do dziś, pozostaje osobą praktycznie nieznaną. To fascynująca, pełna morderczego wysiłku, spektakularnych upadków i niezwykłej siły, historia inspirowana życiem Jerzego Górskiego, który ukończył bieg śmierci oraz ustanowił rekord świata w triathlonowych mistrzostwach świata, zdobywając tytuł mistrza na dystansie Double Ironman z czasem 24h:47min:46sek. Ten rekord nie byłby jednak możliwy, gdyby w jego życiu nie pojawiły się dwie kobiety. Jedną stracił. Druga stała się inspiracją, aby zawalczył o swoje życie.'
        });

        movies.push(mother = {
            name: 'MOTHER!',
            rating: 4,
            thumbnail: "https://media.multikino.pl/thumbnails/50/rc/REY2NUMz/eyJ0aHVtYm5haWwiOnsic2l6ZSI6WyIzMTkiLCI0NzIiXSwibW9kZSI6Imluc2V0In19/uploads/images/films_and_events/mother-pl_87f43ab6f2.jpg",
            movie_link: "http://www.imdb.com/title/tt5109784/?ref_=nv_sr_2",
            section: "default_movie",
            description: 'A couples relationship is tested when uninvited guests arrive at their home',
            trailer_link: "https://www.youtube.com/embed/XpICoc65uh0",
            largedescription: 'She is not so long ago burned to the ground, devotedly restored by the supportive wife. Within this safe environment, the once famous middle-aged poet husband is desirous of creating his magnum opus, however, he seems unable to break out of the persistent creative rut that haunts him. And then, unexpectedly, a knock at the door and the sudden arrival of a cryptic late-night visitor and his intrusive wife will stimulate the writers stagnant imagination, andAmidst a wild flat meadow encircled by an Edenic lush forest, a couple has cocooned itself in a secluded grand mansion that wa much to the perplexed wifes surprise, the more chaos he lets in their haven, the better for his punctured male ego. In the end, will this incremental mess blemish irreparably the couples inviolable sanctuary'
        });

        movies.push(pierwszy_snieg = {
            name: 'PIERWSZY ŚNIEG',
            rating: 3,
            thumbnail: "https://media.multikino.pl/thumbnails/50/rc/NENBNkJE/eyJ0aHVtYm5haWwiOnsic2l6ZSI6WyIzMTkiLCI0NzIiXSwibW9kZSI6Imluc2V0In19/uploads/images/films_and_events/pierwszy-snieg-pl_653759826a.jpg",
            movie_link: "http://www.imdb.com/title/tt1758810/?ref_=fn_al_tt_1",
            section: "default_movie",
            description: 'Detective Harry Hole investigates the disappearance of a woman',
            trailer_link: "https://www.youtube.com/embed/jp3XHZ7spKk",
            largedescription: 'When an elite crime squads lead detective investigates the disappearance of a victim on the first snow of winter, he fears an elusive serial killer may be active again. With the help of a brilliant recruit, the cop must connect decades-old cold cases to the brutal new one if he hopes to outwit this unthinkable evil before the next snowfall.'
        });

        movies.push(coco = {
            name: 'COCO',
            rating: 3,
            thumbnail: "https://media.multikino.pl/thumbnails/50/rc/MUQ1QjRB/eyJ0aHVtYm5haWwiOnsic2l6ZSI6WyIzMTkiLCI0NzIiXSwibW9kZSI6Imluc2V0In19/uploads/images/films_and_events/coco-pl2_9feed57d45.jpg",
            movie_link: "http://www.imdb.com/title/tt2380307/?ref_=nv_sr_1",
            section: "default_movie",
            description: 'Aspiring musician Miguel, confronted with his familys ancestral ban on music...',
            trailer_link: "https://www.youtube.com/embed/Ga6RYejo6Hk",
            largedescription: 'Despite his familys baffling generations-old ban on music, Miguel dreams of becoming an accomplished musician like his idol, Ernesto de la Cruz. Desperate to prove his talent, Miguel finds himself in the stunning and colorful Land of the Dead following a mysterious chain of events. Along the way, he meets charming trickster Hector, and together, they set off on an extraordinary journey to unlock the real story behind Miguels family history'
        });

        movies.push(mylittlepony = {
            name: 'MY LITTLE PONY',
            rating: 3,
            thumbnail: "https://media.multikino.pl/thumbnails/50/rc/MjZFQjg3/eyJ0aHVtYm5haWwiOnsic2l6ZSI6WyIzMTkiLCI0NzIiXSwibW9kZSI6Imluc2V0In19/uploads/images/films_and_events/mylittlepony-pl_2cee56304e.jpg",
            movie_link: "http://www.imdb.com/title/tt4131800/?ref_=fn_al_tt_1",
            section: "default_movie",
            description: 'After a dark force conquers Canterlot, the Mane 6 embark on an unforgettable journey',
            trailer_link: "https://www.youtube.com/embed/t8qQjY9hRvk",
            largedescription: 'After a dark force conquers Canterlot, the Mane 6 - Twilight Sparkle, Applejack, Rainbow Dash, Pinkie Pie, Fluttershy, and Rarity - embark on an unforgettable journey beyond Equestria where they meet new friends and exciting challenges on a quest to use the magic of friendship to save their homeland.'
        });

        movies.push(na_karuzeli_zycia = {
            name: 'NA KARUZELI ŻYCIA',
            rating: 3,
            thumbnail: "https://media.multikino.pl/thumbnails/50/rc/Nzk2MUY1/eyJ0aHVtYm5haWwiOnsic2l6ZSI6WyIzMTkiLCI0NzIiXSwibW9kZSI6Imluc2V0In19/uploads/images/films_and_events/na-karuzeli-zycia-pl_76f51a29e3.jpg",
            movie_link: "http://www.imdb.com/title/tt5825380/?ref_=fn_al_tt_1",
            section: "default_movie",
            description: 'On Coney Island in the 1950s, a lifeguard tells the story of a middle-aged carousel operator',
            trailer_link: "https://www.youtube.com/embed/4FF_iK3v3q4",
            largedescription: 'In the hustle and bustle of 1950s Coney Island, where the buzzing crowd comes and goes trudging slowly over the wooden boardwalks, silent stories of the everyday toilers who give life to the attraction unfold. Somewhere in a clam bar, theres the sad waitress Ginny, a one-time actress and now a suffering wife whos been given a second chance by the side of the well-intentioned but uncouth carousel operator, Humpty. On the other hand, theres Humptys 26-year-old estranged daughter, Carolina, who left the familial nest and a preordained future seeking adventure as a mobsters wife; only to return home with her wings broken, begging for forgiveness. And from the lifeguards high tower, where all is in plain sight, the young and charming lifesaver and hopeful playwright, Mickey, is the inadvertent but potent catalyst that binds everything together. Shattered dreams, reckless love and betrayal, all under the bright lights of Coney Island.'
        });

        movies.push(twoj_vincent = {
            name: 'TWÓJ VINCENT',
            rating: 5,
            thumbnail: "http://1.fwcdn.pl/po/82/07/698207/7799420.6.jpg",
            movie_link: "http://www.imdb.com/title/tt3262342/?ref_=fn_al_tt_1",
            section: "default_movie",
            description: 'In a story depicted in oil painted animation, a young man comes to the last hometown of painter Vincent van Gogh',
            trailer_link: "https://www.youtube.com/embed/1n1RFgapVq0",
            largedescription: 'A year after the death of the artist, Vincent van Gogh, Postman Roulin gets his slacker son, Armand, to hand deliver the artists final letter written to his now late brother, Theo, to some worthy recipient after multiple failed postal delivery attempts. Although disdainful of this seemingly pointless chore, Armand travels to Auvers-sur-Oise where a purported close companion to Vincent, Dr. Gachet, lives. Having to wait until the doctor returns from business, Armand meets many of the people of that village who not only knew Vincent, but were apparently also models and inspirations for his art. In doing so, Armond becomes increasingly fascinated in the psyche and fate of Van Gogh as numerous suspicious details fail to add up. However, as Armond digs further, he comes to realize that Vincents troubled life is as much a matter of interpretation as his paintings and there are no easy answers for a man whose work and tragedy would only be truly appreciated in the future.'
        });

        movies.push(manifesto = {
            name: 'MANIFESTO',
            rating: 4,
            thumbnail: "https://i1.wp.com/teaser-trailer.com/wp-content/uploads/Manifesto-movie-poster-1.jpg?ssl=1",
            movie_link: "http://www.imdb.com/title/tt4511200/?ref_=fn_al_tt_1",
            section: "default_movie",
            description: 'Cate Blanchett performs manifestos as a series of striking monologuest',
            trailer_link: "https://www.youtube.com/embed/110RPhAF1q4",
            largedescription: 'Manifesto draws on the writings of Futurists, Dadaists, Fluxus artists, Suprematists, Situtationists, Dogma 95 and other artist groups, and the musings of individual artists, architects, dancers and filmmakers, editing and reassembling them as a collage of artists manifestos, ultimately questioning the role of the artist in society today. Performing these new manifestos while inhabiting thirteen different personas - among them a school teacher, a puppeteer, a newsreader, a factory worker and a homeless man - Cate Blanchett imbues new dramatic life into these famous words in unexpected contexts.'
        });

        movies.push(listydom3 = {
            name: 'LISTY DO M3',
            rating: 1,
            thumbnail: "https://media.multikino.pl/thumbnails/50/rc/QTQ3ODM5/eyJ0aHVtYm5haWwiOnsic2l6ZSI6WyIzMTkiLCI0NzIiXSwibW9kZSI6Imluc2V0In19/uploads/images/films_and_events/listydom3-pl2_eb24d48978.jpg",
            movie_link: "http://www.imdb.com/title/tt7128042/?ref_=nv_sr_2",
            section: "worst_movie",
            description: '',
            trailer_link: "https://www.youtube.com/embed/JrsSRQ9-who",
            largedescription: 'Centered around a group of individuals, who come to experience magical moments over the course of one day. Full of the power of family, love and the spirit of forgiveness. Each individual comes to realize that Christmas, more than any other time of the year, is full of wonder and surprises.'
        });

        movies.push(zle_mamuski = {
            name: 'ZŁE MAMUŚKI 2',
            rating: 2,
            thumbnail: "https://media.multikino.pl/thumbnails/50/rc/OEQ2MkIy/eyJ0aHVtYm5haWwiOnsic2l6ZSI6WyIzMTkiLCI0NzIiXSwibW9kZSI6Imluc2V0In19/uploads/images/films_and_events/zle-mamuski-pl_ffa7309ce1.jpg",
            movie_link: "http://www.imdb.com/title/tt5181852/?ref_=nv_sr_3",
            section: "worst_movie",
            description: '',
            trailer_link: "https://www.youtube.com/embed/dYQAd0Qv94s",
            largedescription: 'As their own mothers drop in unexpectedly, our three under-appreciated and over-burdened moms rebel against the challenges and expectations of the Super Bowl for mothers: Christmas.'
        });

        movies.push(botoks = {
            name: 'BOTOKS',
            rating: 2,
            thumbnail: "https://media.multikino.pl/thumbnails/50/rc/NTM5RTQ0/eyJ0aHVtYm5haWwiOnsic2l6ZSI6WyIzMTkiLCI0NzIiXSwibW9kZSI6Imluc2V0In19/uploads/images/films_and_events/botoks-pl_80e93ee74b.jpg",
            movie_link: "http://www.imdb.com/title/tt7250358/?ref_=nv_sr_1",
            section: "worst_movie",
            description: '',
            trailer_link: "https://www.youtube.com/embed/Efv1e16vurw",
            largedescription: 'Botoks is intended to be a record of the authentic history of strong, determined and expressive physicians who struggle with lifes decisions and problems: discrimination, maternity pressures, the pursuit of youth, the fight for the right to free choice and own views'
        });

        for (let i = 0; i < Object.keys(movies).length; i++) {
            createMovie(movies[i].name, movies[i].rating, movies[i].thumbnail, movies[i].movie_link, movies[i].description, movies[i].trailer_link, movies[i].largedescription, movies[i].section);
        }
        _reloadPage();
    }

    function Movie(name, rating, thumbnail, movie_link, description, trailer_link, largedescription, section) {

        this.name = name;
        this.rating = rating;
        this.thumbnail = thumbnail;
        this.movie_link = movie_link;
        this.description = description;
        this.trailer_link = trailer_link;
        this.largedescription = largedescription;
        this.section = section;
    }
}
