const buton = document.getElementById('buton')
const url_api = `https://disease.sh/v3/covid-19/countries`;

buton.addEventListener('click', (e) => {
    const place = document.getElementById('place').value;
    const url_api_country = `${url_api}/${place}`
    const url = (place == undefined || place == 'All') ? url_api : url_api_country;


    axios.get(url)
        .then(response => {
            const data_api = response.data
            // console.log(data_api)

            const widget = document.getElementById('widget')

            let html = '';

            if (Array.isArray(data_api)) {
                data_api.forEach(datas => {

                    html += `
                                    <div class="card mx-2 my-4 border-2" style="width: 18rem;">
                                            <img src="${datas.countryInfo.flag}" class="card-img-top" alt="...">
                                            <div class="card-body ">
                                                <h4 class="card-title">${datas.country}</h4>
                                            </div>
                                            <ul class="list-group list-group-flush ">

                                                <li class="list-group-item">Total cases: <strong> ${datas.cases}</strong></li>
                                                <li class="list-group-item">Today cases: <strong class="text-warning">${datas.todayCases}</strong> </li>
                                                <li class="list-group-item">Today recovered: <strong class="text-success">${datas.recovered}</strong> </li>
                                                <li class="list-group-item">Total deaths: <strong class="text-danger">${datas.deaths}</strong> </li>
                                            
                                            </ul>
                                    </div>
                                        
                                    `
                });
            } else {
                html += `
                        <div class="card my-4 border-2" style="width: 18rem;">
                                <img src="${data_api.countryInfo.flag}" class="card-img-top" alt="...">
                                <div class="card-body ">
                                    <h4 class="card-title">${data_api.country}</h4>
                                </div>
                                <ul class="list-group list-group-flush ">

                                    <li class="list-group-item">Total cases: <strong> ${data_api.cases}</strong></li>
                                    <li class="list-group-item">Today cases: <strong class="text-warning">${data_api.todayCases}</strong> </li>
                                    <li class="list-group-item">Today recovered: <strong class="text-success">${data_api.recovered}</strong> </li>
                                    <li class="list-group-item">Total deaths: <strong class="text-danger">${data_api.deaths}</strong> </li>

                                </ul>
                                
                        </div>
                            
                        `
            }

            widget.innerHTML = html;
        })
        .catch(error => console.log(error))

    e.preventDefault();
})
