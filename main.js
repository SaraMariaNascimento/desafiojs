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


// Função para formatar 1 em 01
const zeroFill = n => {
	return ('0' + n).slice(-2);
}

// Cria intervalo
const interval = setInterval(() => {
// Pega o horário atual
const now = new Date();
// Formata a data conforme dd/mm/aaaa hh:ii:ss
const dataHora = zeroFill(now.getUTCDate()) + '/' + zeroFill((now.getMonth() + 1)) + '/' + now.getFullYear() + ' ' + zeroFill(now.getHours()) + ':' + zeroFill(now.getMinutes()) + ':' + zeroFill(now.getSeconds());
// Exibe na tela usando a div#data-hora
document.getElementById('data-hora').innerHTML = dataHora;
}, 1000);

const city = document.querySelector('.name')
const imgContainer = document.querySelector('container-img');
const desc = document.querySelector('.desc');
const temp = document.querySelector('.temp');
const tempMin = document.querySelector('.min')
const tempMax = document.querySelector('.max')

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
      alert(error.message)
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
  console.log(iconName)
  // imgContainer.innerHTML = `<img src="./img/${iconName}.png">`;
  tempMin.innerHTML = result.main.temp_min + "°C"
  tempMax.innerHTML = result.main.temp_max + "°C"


  console.log(result)
}

)()//auto executando



function info(){

let saveInfo =[]

saveInfo.push(city, temp, desc, tempMin, tempMax)

localStorage.setItem('weather', JSON.stringify(saveInfo))

// localStorage.getItem()
}




 
