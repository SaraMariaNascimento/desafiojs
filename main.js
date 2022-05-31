const btnMobile = document.getElementById('btn-mobile')

function toggleMenu(event) {
  if (event.type === 'touchstart') event.preventDefault()
  const nav = document.getElementById('nav')
  nav.classList.toggle('active')
  const active = nav.classList.contains('active')
  event.currentTarget.setAttribute('aria-expanded', active)
  if (active) {
    event.currentTarget.setAttribute('aria-label', 'Fechar Menu')
  } else {
    event.currentTarget.setAttribute('aria-label', 'Abrir Menu')
  }
}

btnMobile.addEventListener('click', toggleMenu)

btnMobile.addEventListener('touchstart', toggleMenu)




const zeroFill = n => {
	return ('0' + n).slice(-2);
}
const interval = setInterval(() => {
const now = new Date();
const dataHora = zeroFill(now.getUTCDate()) + '/' + zeroFill((now.getMonth() + 1)) + '/' + now.getFullYear() + ' ' + zeroFill(now.getHours()) + ':' + zeroFill(now.getMinutes()) + ':' + zeroFill(now.getSeconds());
document.getElementById('data-hora').innerHTML = dataHora;
}, 1000);



const city = document.querySelector('.name')
const imgContainer = document.querySelector('.container-img');
const desc = document.querySelector('.desc');
const temp = document.querySelector('.temp');
const tempMin = document.querySelector('.min')
const tempMax = document.querySelector('.max')
const btn = document.querySelector('.information');

const getUserGeo = () => {
  return new Promise(function (resolve, reject) {
    navigator.geolocation.watchPosition(resolve, reject)
  })
}
//await sempre consulta um metodo de um serviço externo (promise) 
(async function getData() {
  let dataGet = []
  // Pegando latitude, longitude e passando para o array dataGet
  await getUserGeo()
    .then(position => {
      dataGet.push(position.coords.latitude)
      dataGet.push(position.coords.longitude)
    })
    .catch(error => {
      alert("O navegador não suporta geolocalização 😢 ")
      dataGet.push(-23.5489)
      dataGet.push(-42.9687)
    })
  // Passando as posições para as constantes
  const lat = dataGet[0]
  const long = dataGet[1]
  const key = 'f3b143b438f4b745d5b9b967564e93bf'
  const lang = 'pt_br'
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appId=${key}&units=metric&lang=${lang} `

  const getData = await fetch(url)
  const result = await getData.json()
    
  city.innerHTML = result.name
  temp.innerHTML = result.main.temp + "°C"
  desc.innerHTML = result.weather[0].description.toUpperCase()
  let iconName = result.weather[0].icon;
  imgContainer.innerHTML = `<img src="./icons/${iconName}.png">`;
  tempMin.innerHTML = result.main.temp_min + "°C"
  tempMax.innerHTML = result.main.temp_max + "°C"


  console.log(result)
})()


btn.addEventListener("click", () => {

  const dados = {
    city: city.innerHTML,
    temp: temp.innerHTML,
    desc: desc.innerHTML,
    tempMin: tempMin.innerHTML,
    tempMax: tempMax.innerHTML,
    // icon: imgContainer.innerHTML,
    // hour: interval.innerHTML 
  }
  if(localStorage.length === 0) {
    let saveInfo =[]
    saveInfo.push(dados) 
    localStorage.setItem("weather", JSON.stringify(saveInfo))
  }else{
    let menu = document.getElementById("menu")
    menu.innerHTML = ''
    let information = JSON.parse(localStorage.getItem("weather"))
    information.push(dados) 
    localStorage.setItem("weather", JSON.stringify(information))

    let values = JSON.parse(localStorage.getItem('weather'))
    
    values.map((item) => {

      let ul = document.createElement("ul")
      let li = document.createElement("li")
      let span = document.createElement("span")

      span.textContent = `${item.city} ${item.desc} ${item.tempMax} ${item.tempMin}`;

      li.appendChild(span)
      ul.appendChild(li)
      menu.appendChild(ul)
    })
  }
})

function weatherSave(){
  document.getElementById("menu").innerHTML = localStorage.weather;
}
document.onchange = weatherSave
 
