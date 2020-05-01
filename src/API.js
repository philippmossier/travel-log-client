const API_URL = 'http://localhost:1337';



export async function listLogEntries(){
  const response = await fetch(`${API_URL}/api/logs`)
  return response.json()
}


// export async const listLogEntries = () => {
//   const response = await fetch(`${API_URL}/api/logs`)
//   return response.json()
// }