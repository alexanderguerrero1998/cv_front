const API_URL = 'http://localhost:3000/api/person'
//const API_URL_PORTFOLIO = 'http://localhost:3000/api/portfolio/count'

interface Person {
  _id: string
  name: string
  lastName: string
  biography: string
  linkImg: string
  nickname: string
  technologies: string[]
  experience: number
  socials: { icon: string; url: string }[]
  countPortfolio: number
  bioOnly?: boolean
}

export async function getPerson(){
    const response = await fetch(API_URL)
    const data = await response.json()
    if(!response.ok)  throw new Error(data.message)
    return data

}

/*export async function getCountPortfolio():Promise<Person>{
  const response = await fetch(API_URL_PORTFOLIO)
  const data =  await response.json()
  if(!response.ok) throw new Error(data.message)
  return data
}
*/
export  async  function getProfileId(id:string):Promise<Person> {
  const response  = await fetch(`${API_URL}/${id}`)
  const data = await response.json()
  if(!response.ok) throw new Error(data.message)
  return data

}

export async  function updatePerson(user:Omit<Person, '_id'>, id:string){
  const  response = await fetch(`${API_URL}/${id}`,{
    method:'PUT',
    headers:{'Content-Type':'application/json'},
    body: JSON.stringify(user),
    credentials:'include'
  })
  const data = await response.json()
  if(!response.ok) throw new Error(data.message)
  return data
}

export async  function createPerson(user:Omit<Person,'_id'>){
  const response = await fetch(API_URL,{
    method: 'POST',
    headers:{'Content-Type':'application/json'},
    body: JSON.stringify(user),
    credentials:'include'
  })
  const data = await response.json()
  if(!response.ok) throw  new Error(data.message)
  return data
}

export async  function deletePerson(id:string){
  const response =  await fetch(`${API_URL}/${id}`,{
    method:'DELETE',
    credentials:'include'
  })
  const data = await response.json()
  if(!response.ok) throw new  Error(data.message)
  return data
}
