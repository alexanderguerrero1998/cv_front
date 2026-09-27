//const API_URL ='http://localhost:3000/api/section'
const API_URL = `${import.meta.env.VITE_API_URL}/api/section`

export interface Section {
  _id: string
  title: string
  route?: string
  type: string
  subtitle: string
  icon: string
  color: string
  order: number
  active: boolean
  url?: string
}

export async  function getSection ():Promise<Section[]> {
  const  response =  await  fetch(API_URL)
  const data = await  response.json()
  if(!response.ok) throw new Error(data.message)
  return  data
}

export async  function getSectionId(id:string):Promise<Section>{
  const  response = await fetch(`${API_URL}/${id}`)
  const data = await response.json()
  if(!response.ok) throw new Error(data.message)
  return data
}

export async function postSection(section:Omit<Section, '_id'>):Promise<Section>{
  const response  = await fetch(API_URL,{
    method:'POST',
    headers:{'Content-Type':'application/json'},
    body:JSON.stringify(section),
    credentials:'include'
  })
  const data = await response.json()
  if(!response.ok) throw new Error(data.message)
  return  data
}

export  async  function putSection(section:Omit<Section, '_id'>, id:string):Promise<Section>{
  const response  = await  fetch(`${API_URL}/${id}`,{
    method:'PUT',
    headers: {'Content-Type':'application/json'},
    body:JSON.stringify(section),
    credentials:'include'
  })
  const data = await response.json()
  if(!response.ok) throw new Error(data.message)
  return data
}

export async function deleteSection(id:string):Promise<Section>{
  const response = await fetch(`${API_URL}/${id}`,{
    method:'DELETE',
    credentials:'include'
  })
  const  data = await response.json()
  if(!response.ok) throw new  Error(data.message)
  return data
}
