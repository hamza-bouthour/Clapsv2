
function getQuery(queries) {
    const queryKey = Object.keys(queries).map(key => `${encodeURIComponent(key)}=${encodeURIComponent(queries[key])}`)
    return queryKey.join('&');
}
function checkFetch(response) {
    if (!response.ok) {
        throw new Error(response);
    } else if (response.status == 404) {
        $('div.response-error-status').append(`<p>Page not found, please try again later</p>`)
        $('div.response-error-status').removeClass('hidden');
    } else if (response.status == 403) {
        $('div.response-error-status').append(`<p>Please verify your credentials</p>`)
        $('div.response-error-status').removeClass('hidden');
    }
    return response.json();
}
function displayEvents(answer) {
    $('div.events-container').removeClass('hidden');
    $('div.display-events').empty();
    for (i = 0; i < 10; i++) {
        let info = answer._embedded.events[i]
        const eventName = answer._embedded.events[i].name.slice(0,25)
        if (info.hasOwnProperty('info')) {
            $('div.display-events').append(`
                <div class="event-box">
                <img class="event-image-form" src="${answer._embedded.events[i].images[0].url}" alt="event">
                <div class="event-info-box">
                <p class="event-name-form">${eventName}...</p>
                <p class="event-date-form">${answer._embedded.events[i].dates.start.localDate}</p>                
                <p class="event-local-form">${answer._embedded.events[i]._embedded.venues[0].name}<span>${answer._embedded.events[i]._embedded.venues[0].city.name}</span></p>       
                <p class="event-state-form">${answer._embedded.events[i]._embedded.venues[0].state.name}</p>
                <a class="event-ticket-form" href="${answer._embedded.events[i].url}" target="_blank">Tickets</a>
                </div></div>`)
        }
    }
}
function displayEventsHeader(answer) {  
    for (i = 0; i < 4; i++) {
        let eventName = answer._embedded.events[i].name.slice(0,25)
        $('div.display-events-header').append(`
            <div class="event-box-header">
            <img class="event-image-header" src="${answer._embedded.events[i].images[0].url}" alt="event">
            <div class="event-info-box-header">
            <p class="event-name-header">${eventName}...</p>
            <p class="event-date-header">${answer._embedded.events[i].dates.start.localDate}</p>                
            <p class="event-local-header">${answer._embedded.events[i]._embedded.venues[0].name}<span>${answer._embedded.events[i]._embedded.venues[0].city.name}</span></p>       
            <p class="event-state-header">${answer._embedded.events[i]._embedded.venues[0].state.name}</p>
            <a class="event-ticket-header" href="${answer._embedded.events[i].url}" target="_blank">Tickets</a>
            </div></div>`)   
    }
}
function displayVideos(responseJson) { 
    $('div.video-container').removeClass('hidden');
    $('div.display-videos').empty();
    for (i = 0; i < responseJson.items.length; i++) {
        $('div.display-videos').append(`<div class="video-box"><div class="video-window"><iframe width="400"
         height="300" src="https://www.youtube.com/embed/${responseJson.items[i].id.videoId}" frameborder="0" allowfullscreen></iframe></div><div class="video-description"><p class="video-details">${responseJson.items[i].snippet.title}</p><p class="video-details">Channel: ${responseJson.items[i].snippet.channelTitle}</p></div></div>`)
         $('body').css("cursor", "auto");
    }  
}
function displayPlaylist(responseJson) {
    $('div.playlist-container').removeClass('hidden');
    $('div.display-playlist').empty();
    for (i = 0; i < responseJson.items.length; i++) {
        $('div.display-playlist').append(`<div class="playlist-box"><div class="playlist-window"><iframe width="400"
         height="300" src="https://www.youtube.com/embed/${responseJson.items[i].id.videoId}" frameborder="0" allowfullscreen></iframe></div><div class="playlist-description"><p class="playlist-details">${responseJson.items[i].snippet.title}</p><p class="playlist-details">Channel: ${responseJson.items[i].snippet.channelTitle}</p></div></div>`)
         $('body').css("cursor", "auto");
    }  
} 
function displayNews(responseJson) {
    $('div.display-news-header').empty();
    for (i=0; i < 2; i++) {
        let articleDescription  = responseJson.articles[i].description.slice(0, 110);
        $('div.display-news-header').append(
            `<div class="news-box">
                <div class="news-thumbnail">
                    <img class="news-image" src="${responseJson.articles[i].urlToImage}">
                </div>
                <div class="news-details">
                    <a class="news-link" href="${responseJson.articles[i].url}" target="_blank">${responseJson.articles[i].title} </a>
                    <p>${articleDescription}...</p>
                    <p class="news-source">${responseJson.articles[i].source.name}</p>
                </div>
            </div>`
        );
    }
}

function getEventsForm() {
    $('body').css("cursor", "progress");
    const keyword = $('input#form-search-keyword-input').val();
    const queries = {
        keyword,
        Countrycode: 'us',
        apikey: 'aaCLKnns2YaVmTYNlBA1Kt7xzhGyyZDY',
    }
    const uri = getQuery(queries);
    const url = 'https://app.ticketmaster.com/discovery/v2/events.json?' + uri;
    console.log(url);
    fetch(url)
        .then(response => checkFetch(response))
        .then(responseJson => displayEvents(responseJson))
        .catch(error => {
           console.log(error);
        });
}
function getEventHeader() { 
    const queries = {
        keyword:'rock',
        Countrycode: 'us',
        apikey: 'aaCLKnns2YaVmTYNlBA1Kt7xzhGyyZDY',
    }
    const uri = getQuery(queries);
    const url = 'https://app.ticketmaster.com/discovery/v2/events.json?' + uri;
    console.log(url);
    fetch(url)
        .then(response => checkFetch(response))
        .then(responseJson => displayEventsHeader(responseJson))
        .catch(error => {
            console.log(error);
        });
}
getEventHeader();
function getNews () {
    const queryNews = $('input#form-search-keyword-input').val();
    const q = queryNews
    const newsQueries = {
        q,
        from: '2020-04-21',
        sortBy: 'popularity',
        apiKey: '2c0580819097450aba9194fb5ba7943c'
    }
    const newsUri = getQuery(newsQueries);
    console.log(newsUri);
    const newsUrl = 'https://newsapi.org/v2/everything?' + newsUri
    console.log(newsUrl);
    fetch(newsUrl)
    .then(response => checkFetch(response))
    .then(responseJson => displayNews(responseJson))
    .catch(error => {
        console.log(error);
     });
}
function getNewsheader () {
    const newsQueries = {
        q: 'trump',
        from: '2020-04-21',
        sortBy: 'popularity',
        apiKey: '2c0580819097450aba9194fb5ba7943c'
    }
    const newsUri = getQuery(newsQueries);
    console.log(newsUri);
    const newsUrl = 'https://newsapi.org/v2/everything?' + newsUri
    console.log(newsUrl);
    fetch(newsUrl)
    .then(response => checkFetch(response))
    .then(responseJson => displayNews(responseJson))
    .catch(err => {
        throw new error ('oops something went wrong') 
     });
}
getNewsheader();
function getVideos() {
    const queryYoutube = $('input#form-search-keyword-input').val();
    const musicStyle = $('select#select_style_lessons').val();
    const q = queryYoutube + musicStyle + 'live'
    const youtubeQueries = {
        part: 'snippet',
        q,
        maxResults: 12,
        key: 'AIzaSyC1Avq5e1-qz1o6GeyULMRg9MO7b62_tSk'
    }
    const youtubeUri = getQuery(youtubeQueries);
    console.log(youtubeUri);
    const youtubeUrl = 'https://www.googleapis.com/youtube/v3/search?' + youtubeUri;
    console.log(youtubeUrl);
    fetch(youtubeUrl)
        .then(response => checkFetch(response))
        .then(responseJson => displayVideos(responseJson))
        .catch(error => {
            console.log(error);
         });        
}
function getPlaylist() {
    const queryYoutube = $('input#form-search-keyword-input').val();
    const musicStyle = $('select#select_style_lessons').val();
    const q = queryYoutube + musicStyle + 'playlist'
    const youtubeQueries = {
        part: 'snippet',
        q,
        maxResults: 12,
        key: 'AIzaSyC1Avq5e1-qz1o6GeyULMRg9MO7b62_tSk'
    }
    const youtubeUri = getQuery(youtubeQueries);
    console.log(youtubeUri);
    const youtubeUrl = 'https://www.googleapis.com/youtube/v3/search?' + youtubeUri;
    console.log(youtubeUrl);
    fetch(youtubeUrl)
        .then(response => checkFetch(response))
        .then(responseJson => displayPlaylist(responseJson))
        .catch(error => {
            console.log(error);
         });       
}

let navClickCount = 1 
let contactClickCount = 1


function updateInformations() {
    const userFirstName = $('input#signup-firstname-input').val();
    const userLastName = $('input#signup-lastname-input').val();
    const userEmail = $('input#signup-email-input').val();
    $('button#button-finish-update').removeClass('hidden');
    $('td#user-firstname').empty();
    $('td#user-firstname').append(`<input class="information-label" type="text" name="" id="update-input-firstname" required placeholder="${userFirstName}">`);
    $('td#user-lastname').empty();
    $('td#user-lastname').append(`<input class="information-label" type="text" name="" id="update-input-lastname" required placeholder="${userLastName}">`);
    $('td#user-email').empty();
    $('td#user-email').append(`<input class="information-label" type="email" name="" id="update-input-email" required placeholder="${userEmail}">`);
    console.log(userEmail);
}
function signUpForm() {
    let userEvents = 'You have no events coming up'
    let userTickets = 'No tickets'
    let userParking = 'No parking pass'
    let userPayment = 'No payment informations'
    const userFirstName = $('input#signup-firstname-input').val();
    const userLastName = $('input#signup-lastname-input').val();
    const userEmail = $('input#signup-email-input').val();
    const userPassword = $('input#signup-password-input').val();
    if (userFirstName == '' || userLastName == '' || userEmail == '' || userPassword == '') {
        $('label#fields-required-error-message').removeClass('hidden');
    } else {
        $('div#display_signup').removeClass('container_signup_form').addClass('hidden');
        $('div#display_account').removeClass('hidden').addClass('container_profile_information');
        $('div#user-firstname-welcome span').text(userFirstName);
        $('td#user-firstname').text(userFirstName);
        $('td#user-lastname').text(userLastName);
        $('td#user-email').text(userEmail);
        $('td#user-events').text(userEvents);
        $('td#user-ticket').text(userTickets);
        $('td#user-parking').text(userParking);
        $('td#user-payment').text(userPayment);
    }
}

$(document).ready(function () {
    $('form.form-search').on('submit', function (e) {
        e.preventDefault();
        $('body').css("cursor", "progress");
        getPlaylist();
        getVideos();
        getEventsForm();
        getNews();
    });
   $('form.search-header-form').on('submit', function (e) {   
        e.preventDefault();
        $('body').css("cursor", "progress");
        getPlaylist();
        getVideos();
        getEventsForm();
        getNews();
    });
    $('form.signup-form').on('submit', function (event) {
        event.preventDefault();
        signUpForm();
    });
    $('a#link-signup-no-account').on('click', function (event) {
        event.preventDefault();
        $('div#display_login').removeClass('login_form_container').addClass('hidden');
        $('div#display_signup').removeClass('hidden').addClass('container_signup_form');
    });
    $('button#signup-form-submit').on('click', function (event) {
        event.preventDefault();
        signUpForm();
    });
    $('button#edit-info-button').on('click', function (event) {
        event.preventDefault();
        updateInformations();
    });
    $('input.signup-form-input').on('click', function (event) {
        event.preventDefault();
        $('label#fields-required-error-message').addClass('hidden');
    });
    $('button#button-finish-update').on('click', function (event) {
        event.preventDefault();
        let updatedUserFirstName = $('input#update-input-firstname').val();
        let updatedUserLastName = $('input#update-input-lastname').val();
        let updatedUserEmail = $('input#update-input-email').val();
        $('td#user-firstname').empty();
        $('td#user-firstname').html(`<p>${updatedUserFirstName}</p>`);
        $('td#user-lastname').empty();
        $('td#user-lastname').text(updatedUserLastName);
        $('td#user-email').empty();
        $('td#user-email').text(updatedUserEmail);
        $('div#user-firstname-welcome span').empty();
        $('div#user-firstname-welcome span').text(updatedUserFirstName);
        $('button#button-finish-update').addClass('hidden');
    });
    $('div.nav-sandiwch').on('click', function (event) {
        event.preventDefault();
        event.stopPropagation();
        if (navClickCount == 1) {
        $('div.sandwich-line').addClass('sandwich-line-on-click');
        $('div.nav-bar-line2').removeClass('hidden');  
        navClickCount++;
        }  else {
            $('div.sandwich-line-on-click').removeClass('sandwich-line-on-click').addClass('sandwich-line');
            $('div.nav-bar-line2').addClass('hidden'); 
            $('div.html-bottom-home').addClass('mobile-contact'); 
            navClickCount = 1;
        }        
    });
    $('a.show-contact-button').on('click', function (event) {
        event.preventDefault();
        event.stopPropagation();
        if (contactClickCount == 1) {
            $('div.html-bottom-home').removeClass('mobile-contact'); 
            contactClickCount++;
            
        } else {
            $('div.html-bottom-home').addClass('mobile-contact'); 
            contactClickCount = 1;
            
        }  
    });     
});




