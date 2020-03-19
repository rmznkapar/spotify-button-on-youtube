let uri = 'none';

document.documentElement.addEventListener('transitionend', function(event) {
    if (uri !== event.target.baseURI && event.target.className === 'ytp-paid-content-overlay'){
        runLoad();
        uri = event.target.baseURI;
    }
}, true);


function runLoad(){
    let title = document.title;

    if (title.slice(-10) === ' - YouTube' ){
        title = document.title.slice(0 ,-10);
    }

    let songQuery = encodeURI( getSongName(title) );
    songQuery = songQuery.replace(/'/g, "%27");
    createButton(songQuery);
}

function getSongName(title) {
    //
    let specList = ['(', 'feat.', 'ft.', '[', 'Prod By'];
    let subList = ['&', ' x '];

    for (let speChar of specList){
        if (title.indexOf(speChar) !== -1){
            title = title.substring(0, title.indexOf(speChar));
        }
    }

    for (let subChar of subList){
        if (title.indexOf(subChar) !== -1){
            title = title.substring(0, title.indexOf(subChar)) + title.substring(title.indexOf(' - '));
        }
    }
    return title;
}

function createButton(songQuery) {
    let redirectUrl = 'spotify:search:' + songQuery;

    let menuElement = document.getElementById('menu-container').firstChild.firstChild.firstChild.nextSibling;
    let buttonNode = document.createElement("A");
    let textNode = document.createTextNode("SPOTIFY");
    const redirectSpotify = "window.open('"+ redirectUrl +"', '_blank');\n";

    buttonNode.setAttribute("id", "ext-button");
    buttonNode.setAttribute("onclick", redirectSpotify);

    buttonNode.appendChild(textNode);
    menuElement.appendChild(buttonNode);
}


