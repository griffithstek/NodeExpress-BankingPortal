const url = 'ws://localhost:3000'
const connection = new WebSocket(url)
const logWindow = document.querySelector('#log-window')

connection.onopen = () => {
  connection.send("tasks.md") 
}

connection.onerror = (error) => {
  console.log(`WebSocket error: ${error}`)
}

connection.onmessage = (e) => {
  console.log(e.data)
  //logWindow.innerHTML = `<br>${e.data}<br>` + logWindow.innerHTML
  var logs = e.data.split("\n").reverse().join("<br>")
  logWindow.innerHTML = `<br>${logs}<br>`
}