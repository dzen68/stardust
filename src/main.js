import './style.css'
const API_KEY = 'ymnJ8kB7z1B0STbyS9s88bmVDKx3TjUmH1aZ1CDW';

const appContainer = document.querySelector('#app');
const dateInput = document.querySelector('#datepicker');

async function getAstronomyData(date) {
    appContainer.innerHTML = '<p>Loading universe..........</p>';

    try {

        const response = await fetch(`https://api.nasa.gov/planetary/apod?api_key=${API_KEY}&date=${date}`);
        const data = await response.json();

        let media;
        if (data.media_type === 'image') {
            media = `<img src="${data.url}" alt="${data.title}" />`;
         } else if (data.url.includes("youtube")){
            media = `<iframe width="100%" height ="400" src="${data.url}" frameborder="0" allowfullscreen></iframe>`;
            } else {
                media = `<video src="${data.url}" controls></video>`;
              }
            
        appContainer.innerHTML =`
        <h2>${data.title}</h2>
        ${media}
        <p>${data.explanation}</p>
        `;

            }catch (error){
        appContainer.innerHTML =`<p> Ooops! something went wrong: ${error.message}</p>`;
    } 
}
if (dateInput) {
    dateInput.addEventListener('change',(event) => {
        const selectedData = event.target.value;
        getAstronomyData(selectedData);
    });
}


getAstronomyData('');