import fetch from "node-fetch";

const baseUrl='http://crm.miniso.com.mx:8080/api';

export const getSaludo = async(req,res)=>{
  try {
    const response = await fetch(`${baseUrl}`);
    const result = await response.json();
    console.log(result);
    return res.json(result)
  } catch (error) {
    console.log(error);
    return
  }
}

export const createNewUser = async(req,res)=>{
  const dataUser = req.body;
  
  const endpoint= '/newFlowCreateUserByForm/';
  const options = {
    method: 'POST',
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(dataUser)
  }
  try {
    const response = await fetch(`${baseUrl}${endpoint}`,options);
    const result = await response.json();
    //console.log(result);
    return res.json(result)
  } catch (error) {
    console.log(error);
    return res.json(error);
  }
}