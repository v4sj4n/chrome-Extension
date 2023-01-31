let myLeads = []
const inputEl = document.getElementById('input-el')
const inputBtn = document.getElementById('input-btn')
const tabBtn = document.getElementById('tab-btn')
const deleteBtn = document.getElementById('delete-btn')
const ulEl = document.getElementById('ul-el')

const leadsFromLocalStorage = JSON.parse(localStorage.getItem('myLeads'))

if (leadsFromLocalStorage) {
  myLeads = leadsFromLocalStorage
  render(myLeads)
}

function render(leads) {
  let listItems = ''
  leads.forEach((element) => {
    listItems += `
              <li>
                  <a target='_blank' href='${element}'>
                      ${element}
                  </a>
              </li>
          `
  })
  ulEl.innerHTML = listItems
}

tabBtn.addEventListener('click', () => {
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    myLeads.push(tabs[0].url)
    localStorage.setItem('myLeads', JSON.stringify(myLeads))
    render(myLeads)
  })
})

inputEl.addEventListener('keypress', function (e) {
  if (event.shiftKey && event.keyCode === 13) {
    console.log(e.key)
    myLeads.push(inputEl.value)
    inputEl.value = ''
    localStorage.setItem('myLeads', JSON.stringify(myLeads))
    render(myLeads)
  }
})

inputBtn.addEventListener('click', function () {
  myLeads.push(inputEl.value)
  inputEl.value = ''
  localStorage.setItem('myLeads', JSON.stringify(myLeads))
  render(myLeads)
})

deleteBtn.addEventListener('dblclick', function () {
  localStorage.clear()
  myLeads = []
  render(myLeads)
})
