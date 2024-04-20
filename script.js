// Deklaracja zmiennych
const video = document.getElementById('video-player');
const modeToggle = document.getElementById('mode-toggle');

// MOTYW STRONY

function setTheme(theme) {
    document.body.classList.toggle('dark-mode', theme === 'dark'); // Jeśli theme jest równy 'dark', klasa dark-mode zostanie dodana w body, w przeciwnym razie zostanie usunięta
    localStorage.setItem('theme', theme); // Zapisuje aktualny motyw strony do pamięci podręcznej przeglądarki pod kluczem 'theme'
}
function toggleTheme() {
    const currentTheme = localStorage.getItem('theme'); // Pobiera aktualny motyw strony z pamięci podręcznej przeglądarki
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark'; // Określa nowy motyw strony na podstawie aktualnego motywu
    setTheme(newTheme); 
}
// Nasłuchiwanie kliknięcia na przycisk zmiany motywu
modeToggle.addEventListener('click', function() {
    toggleTheme();
});
// Sprawdzanie, czy istnieje preferencja motywu strony w pamięci podręcznej przeglądarki i ustawienie odpowiedniegi motywu przy załadowaniu strony
document.addEventListener('DOMContentLoaded', function() {
    const currentTheme = localStorage.getItem('theme');
    if (currentTheme) {
        setTheme(currentTheme);
    }
});
// Funkcja do zapauzowania innych filmów
/* Zapobiega równoczesnemu odtwarzaniu dwóch filmów */
function pauseOtherVideos(currentVideo) {
    const videos = document.querySelectorAll('.video-thumbnail');
    videos.forEach(video => {
        if (video !== currentVideo) {
            video.pause();
        }
    });
}
// KATEGORIE FILMÓW
/* Lista filmów z danych kategorii w formie tablicy zawierającej tytuł filmu, adres url dla dwóch jakości, datę premiery */
const filmsByCategory = {
    "Komedia": [
        { title: "LATANIE DLA POCZĄTKUJĄCYCH", url_low: "komedia/k1_360.mp4", url_high: "komedia/k1_720.mp4", datapremiery: "19 kwietnia 2024" },
        { title: "ISTOTY FANTASTYCZNE", url_low: "komedia/k2_360.mp4", url_high: "komedia/k2_720.mp4", datapremiery: "17 maja 2024" },
        { title: "DEADPOOL & WOLVERINE", url_low: "komedia/k3_360.mp4.mp4", url_high: "komedia/k3_720.mp4", datapremiery: "26 lipca 2024" }
    ],
    "Horror": [
        { title: "ABIGAIL", url_low: "horror/h1_360.mp4", url_high: "horror/h1_720.mp4", datapremiery: "19 kwietnia 2024" },
        { title: "NIEPOKALANA", url_low: "horror/h2_360.mp4", url_high: "horror/h2_720.mp4", datapremiery: "26 kwietnia 2024" },
        { title: "GNIAZDO PAJĄKA", url_low: "horror/h3_360.mp4", url_high: "horror/h3_720.mp4", datapremiery: "3 maja 2024" }
    ],
    "Akcja": [
        { title: "KASKADER", url_low: "akcja/ak1_360.mp4", url_high: "akcja/ak1_720.mp4", datapremiery: "3 maja 2024" },
        { title: "KRÓLESTWO PLANETY MAŁP", url_low: "akcja/ak2_360.mp4", url_high: "akcja/ak2_720.mp4", datapremiery: "10 maja 2024" },
        { title: "FURIOSA: SAGA MAD MAX", url_low: "akcja/ak3_360.mp4", url_high: "akcja/ak3_720.mp4", datapremiery: "24 maja 2024" }
    ],
    "Animowany": [
        { title: "KICIA KOCIA W PRZEDSZKOLU", url_low: "animowany/an1_360.mp4", url_high: "animowany/an1_720.mp4", datapremiery: "26 kwietnia 2024" },
        { title: "UCIECZKA ZE ZWIERZOWERSUM", url_low: "animowany/an2_360.mp4", url_high: "animowany/an2_360.mp4", datapremiery: "10 maja 2024" },
        { title: "W GŁOWIE SIĘ NIE MIEŚCI 2", url_low: "animowany/an3_360.mp4", url_high: "animowany/an3_360.mp4", datapremiery: "12 czerwca 2024" }
    ],
    "Inne": [
        { title: "BACK TO BLACK. HISTORIA AMY WINEHOUSE", url_low: "inne/i1_360.mp4", url_high: "inne/i1_720.mp4", datapremiery: "19 kwietnia 2024" },
        { title: "PRZYSIĘGA IRENY", url_low: "inne/i2_360.mp4", url_high: "inne/i2_720.mp4", datapremiery: "19 kwietnia 2024" },
        { title: "MÓJ PIES ARTUR", url_low: "inne/i3_360.mp4", url_high: "inne/i3_360.mp4", datapremiery: "26 kwietnia 2024" },
        { title: "SUPERSIOSTRY", url_low: "inne/i4_360.mp4", url_high: "inne/i4_720.mp4", datapremiery: "10 maja 2024" }
    ],
};

/* Pobranie listy filmów z danej kategorii */
function displayCategoryFilms(category) {
    const categoryFilms = filmsByCategory[category]; // Pobiera listę filmów z wybranej kategorii z obiektu filmsByCategory i zapisuje je do zmiennej categoryFilms.
    const videoContainer = document.querySelector('.video-container'); // Znajduje kontener, w którym będą wyświetlane miniatury filmów

    // Usunięcie aktualnie wyświetlanych filmów
    /* Zapobiega "zaśmiecaniu" strony; po zmianie kategorii nie wyświetlają się filmy z wcześniej wybranej kategorii */
    videoContainer.innerHTML = '';

    // Wyświetlenie miniatur filmów dla danej kategorii
    /* Pętla, wewnątrz której tworzą się elementy dla każdego filmu. */
    categoryFilms.forEach(film => {
        const videoThumbnail = document.createElement('video'); // Tworzy element <video>, który będzie miniaturą filmu.
        videoThumbnail.src = film.url_high; // Ustawia źródło (src) miniatury filmu na adres URL filmu.
        videoThumbnail.controls = true; // Dodaje kontrolki do miniatury filmu, umożliwiając odtwarzanie, pauzowanie itp.
        videoThumbnail.classList.add('video-thumbnail'); // Dodaje klasę CSS do miniatury filmu. Dzięki temu w CSS można edytować atrybuty miniatury.

        const title = document.createElement('h3'); // Tworzy element <h3> zawierający nagłówek filmu.
        title.textContent = film.title; // Ustawia nagłówek według tego, który znajduje się we wcześniejszej tablicy kategorii.

        const releaseDate = document.createElement('p'); // Tworzy element <p> zawierający datę premiery.
        releaseDate.textContent = `Premiera: ${film.datapremiery}`; // Ustawia datę premiery według tej, która znajduje się we wcześniejszej tablicy kategorii.

        const highQualityButton = document.createElement('button'); // Tworzy element <button> odpowiadający za zmianę jakości na wyższą.
        highQualityButton.textContent = '720p'; // Ustawia napis na przycisku na '720p'
        highQualityButton.addEventListener('click', function() { // Nasłuchiwanie kliknięcia na przycisk '720p'
            videoThumbnail.src = film.url_high; // Kiedy użytkownik kliknie ten przycisk, wywoływana jest funkcja, która zmienia jakość filmu na wyższą dla wybranej kategorii.
        });

        const lowQualityButton = document.createElement('button'); // Tworzy element <button> odpowiadający za zmianę jakości na niższą.
        lowQualityButton.textContent = '360p'; // Ustawia napis na przycisku na '360p'
        lowQualityButton.addEventListener('click', function() { // Nasłuchiwanie kliknięcia na przycisk '360p'
            videoThumbnail.src = film.url_low; // Kiedy użytkownik kliknie ten przycisk, wywoływana jest funkcja, która zmienia jakość filmu na niższą dla wybranej kategorii.
        });

        const videoWrapper = document.createElement('div'); // Tworzy kontener <div> dla miniatury filmu, zawierający tytuł i miniaturę.
        videoWrapper.classList.add('video-wrapper'); // Dodaje klasę CSS do elementu <div>, co umożliwia zastosowanie stylów CSS. 
        videoWrapper.appendChild(title); // Tytuł
        videoWrapper.appendChild(releaseDate); // Data premiery
        videoWrapper.appendChild(videoThumbnail); // Miniatura

        const buttonsContainer = document.createElement('div'); // Tworzy kontener <div> który będzie zawierał przyciski do zmiany jakości
        buttonsContainer.classList.add('quality-buttons'); // Dodaje klasę CSS do elementu <div>, co umożliwia zastosowanie stylów CSS.
        buttonsContainer.appendChild(highQualityButton); // Umieszcza w <div class='quality-buttons'> przycisk '720p'
        buttonsContainer.appendChild(lowQualityButton); // Umieszcza w <div class='quality-buttons'> przycisk '360p'
        videoWrapper.appendChild(buttonsContainer); // Dodaje <div class='quality-buttons'> wewnątrz <div class='video-wrapper'>

        /* Dodaje nasłuchiwanie na zdarzenie odtwarzania dla miniatury filmu. 
        Kiedy film jest odtwarzany, wywołuje funkcję pauseOtherVideos(videoThumbnail), która zapewnia, że tylko jeden film jest odtwarzany naraz. */
        videoThumbnail.addEventListener('play', function() {
            pauseOtherVideos(videoThumbnail);
        });
        /* odpowiada za dodanie elementu <div> (który zawiera miniaturę filmu i tytuł) do kontenera <div> o klasie 'video-container'. 
        W ten sposób każda miniatura filmu wraz z tytułem zostanie umieszczona w kontenerze, który wyświetla wszystkie filmy z danej kategorii na stronie. 
        Dodanie elementu do kontenera umożliwia wyświetlenie go na stronie internetowej w odpowiednim miejscu i kontekście.*/ 
        videoContainer.appendChild(videoWrapper);
    });
}

// Nasłuchiwanie kliknięcia na kafelki z kategoriami
/* Kliknięcie na kafelek danej kategorii powoduje wyświetlenie listy filmów z danej kategorii */
const categoryLinks = document.querySelectorAll('.category-link');
categoryLinks.forEach(link => {
    link.addEventListener('click', function(event) {
        event.preventDefault();
        const category = this.textContent;
        displayCategoryFilms(category);
    });
});

// Funkcja odpowiedzialna za wyświetlanie losowego filmu po odświeżeniu strony 
/* Wyświetlenie losowego filmu w sekcji <div class="video-container" id="random-video"> po załadowaniu strony, 
aby użytkownik mógł zobaczyć przykładowy film przed kliknięciem na kafelek kategorii */
document.addEventListener('DOMContentLoaded', function() {
    // Losowanie kategorii
    const categories = Object.keys(filmsByCategory);
    const randomCategory = categories[Math.floor(Math.random() * categories.length)];
    
    // Losowanie filmu z wylosowanej kategorii
    const randomFilm = filmsByCategory[randomCategory][Math.floor(Math.random() * filmsByCategory[randomCategory].length)];

    // Aktualizacja <div class="video-container" id="random-video">
    const videoContainer = document.getElementById('random-video');
    const videoPlayer = videoContainer.querySelector('video');
    videoContainer.querySelector('h3').textContent = randomFilm.title; // zmiana zawartości <h3> na tytuł wylosowanego filmu
    videoContainer.querySelector('p').textContent = `Premiera: ${randomFilm.datapremiery}` // wyświetlenie daty premiery wylosowanego filmu
    videoPlayer.src = randomFilm.url_high; // wtswietlanie filmu o wyzszej jakosci
});