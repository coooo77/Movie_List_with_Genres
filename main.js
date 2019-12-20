(function () {

  const genres = {
    "1": "Action",
    "2": "Adventure",
    "3": "Animation",
    "4": "Comedy",
    "5": "Crime",
    "6": "Documentary",
    "7": "Drama",
    "8": "Family",
    "9": "Fantasy",
    "10": "History",
    "11": "Horror",
    "12": "Music",
    "13": "Mystery",
    "14": "Romance",
    "15": "Science Fiction",
    "16": "TV Movie",
    "17": "Thriller",
    "18": "War",
    "19": "Western"
  }

  // make pills-tab and pills-tabContent
  let htmlContentForTablist = ''
  const tab = document.getElementById('v-pills-tab')
  let htmlContentForTabpanel = ''
  const tabContent = document.getElementById('v-pills-tabContent')

  for (let i = 1; i <= Object.keys(genres).length; i++) {
    // remove space in genres 16 and 17, or we can't find site by getElementById
    let name = genres[i].replace(' ', '')
    htmlContentForTablist += `
      <a class="nav-link border text-dark" id="v-pills-${name}-tab" data-toggle="pill" href="#v-pills-${name}" role="tab" aria-controls="v-pills-${name}" aria-selected="true">${genres[i]}</a>
    `
    htmlContentForTabpanel += `
      <div class="tab-pane fade" id="v-pills-${name}" role="tabpanel" aria-labelledby="v-pills-${name}-tab">
        <div class="container">
          <div class="row" id="${name}">
            Unable to find genres type: ${genres[i]}
          </div>
        </div>
      </div>
      `
  }

  // show  content of moives in first genre
  tab.innerHTML = htmlContentForTablist
  tab.firstElementChild.className = "nav-link active border text-dark"

  tabContent.innerHTML = htmlContentForTabpanel
  tabContent.firstElementChild.className = "tab-pane fade show active"

  // get data of movies by axios
  const baseUrl = 'https://movie-list.alphacamp.io'
  const indexUrl = baseUrl + '/api/v1/movies'
  const posterUrl = baseUrl + '/posters/'
  let data = []


  axios.get(indexUrl)
    .then((response) => {
      data.push(...response.data.results)

      for (let i = 1; i <= Object.keys(genres).length; i++) {

        let htmlContent = ''
        let genresData = data.filter(movie => movie.genres.includes(i))
        genresData.forEach(movie => {

          let tagcontent = ``
          movie.genres.forEach(tag => {
            tagcontent += `
            <span class="bg-light mr-2">${genres[tag]}</span>
            `
          })

          htmlContent += `
          <div class="col-sm-3">
            <div class="card mb-2">
              <img src="${posterUrl + movie.image}" class="card-img-top" alt="${movie.title}">
              <div class="card-body">
                <h5 class="card-title">${movie.title}</h5>
                <p class="card-text">
                  <small class="text-muted" id="tag-${movie.id}">${tagcontent}</small>
                </p>
              </div>
            </div>
          </div>  
          `
          // remove space in genres 16 and 17, or we can't find site by getElementById
          let name = genres[i].replace(' ', '')
          let site = document.getElementById(`${name}`)
          site.innerHTML = htmlContent
        })

      }
    })
    .catch((error) => console.log(error))
})()