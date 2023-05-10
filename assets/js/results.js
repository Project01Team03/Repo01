var randomBtn = $('#random-btn')
var resultsHTML = './results.html'
var quoteEl = $('#quote')
var authorEl = $('#author')
var bodyEl = $('body');
var imageEL = $('#image')
var divEl = $('#btn-container')

var getQuote = function() {
    var category = 'inspirational'
    $.ajax({
        method: 'GET',
        url: 'https://api.api-ninjas.com/v1/quotes?category=' + category,
        headers: { 'X-Api-Key': 'v0tccXcwsiP+3vSXv3/lOg==q1GzyzemvaKPl4ad'},
        contentType: 'application/json',
    }).then(function(result) {
            /* console.log(result[0].quote); */
            localStorage.setItem('Quote', result[0].quote)
            localStorage.setItem('Author', result[0].author)
        },  
    );
}

var img = document.createElement("img");
divEl.append(img);

if(localStorage.getItem('Quote') != null){
    quoteEl.text(`${localStorage.getItem('Quote')}` )
    authorEl.text(`-${localStorage.getItem('Author')}`)
    img.src = `${localStorage.getItem('posterImage')}`;
}


function makeImg() {
    var backgroundImg = {
        shiba: "http://shibe.online/api/shibes?count=1&urls=true&httpsUrls=true",
        birds: "https://shibe.online/api/birds?count=1&urls=true&httpsUrls=true",
        cats: "https://shibe.online/api/cats?count=1&urls=true&httpsUrls=true",
        dog: "https://random.dog/woof.json",
        fox: "https://randomfox.ca/floof/",
        picsum: "https://picsum.photos/v2/list?limit=1"
    };

    var cuteImgs = Object.keys(backgroundImg);
    var randomIndex = Math.floor(Math.random() * cuteImgs.length);
    var randomImg = cuteImgs[randomIndex];
    var generateImg = backgroundImg[randomImg];

    fetch(generateImg)
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        var filteredData = [];
        if (Array.isArray(data)) {
            filteredData = data.filter(item => item.download_url || item.url || item.image).map(item => item.download_url || item.url || item.image); 
        } else if (typeof data === 'object') {
            if (data.download_url || data.url || data.image) {
                filteredData = [data.download_url || data.url || data.image];
            }
        }
        localStorage.setItem('posterImage', filteredData[0]);
        console.log(filteredData[0]);
    });
}

randomBtn.click(function() {
    getQuote()
    makeImg()
    quoteEl.text(`${localStorage.getItem('Quote')}`)
    authorEl.text(`-${localStorage.getItem('Author')}`)
    
    img.src = `${localStorage.getItem('posterImage')}`;
})

