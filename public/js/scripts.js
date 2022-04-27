if (document.querySelector('#activity-link')) {
  document.querySelector('#activity-link').addEventListener('click', (e) => {
    const loaderDiv = document.createElement('div')
    loaderDiv.id = 'loader'
    loaderDiv.classList.add('center-loader')
    document.querySelector('body').appendChild(loaderDiv)
    document.querySelector('main').style.visibility = 'hidden'
  })
}
