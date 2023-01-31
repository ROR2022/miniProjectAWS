import React, { useEffect, useState } from "react";
import axios from "axios";
import Spinner from 'react-bootstrap/Spinner';
import {useAsyncEffect} from 'use-async-effect';




const myId = () => {
  let id = [];
  let base = "0123456789ABCDEF";

  for (let i = 0; i < 8; i++) {
    let numero = (Math.random() * 15).toFixed(0);
    id.push(base[numero]);
  }
  return id.join("");
};

const createNewUser = async (dataUser) => {
  const endpoint = "/api/createNewUser/";
  try {
    const response = await axios.post(`${endpoint}`, dataUser);
    //const result = await response.json();
    console.log(response);
    return response.data;
  } catch (error) {
    console.log(error);
    return error;
  }
};



const Home = () => {
  const [creandoClientes, setCreandoClientes] = useState(false);
  const [myClients, setMyClients] = useState(null);
  const [nuevoCliente, setNuevoCliente] = useState(null);
  const [resBack, setResBack] = useState(false);

  
  useEffect(() => {
    if(nuevoCliente&&resBack){
      if(myClients)
          setMyClients([...myClients,nuevoCliente])
        else setMyClients([nuevoCliente])
    }
    console.log('myClients:..',myClients);
    setResBack(false);
    return
  }, [nuevoCliente,myClients,resBack])
  
  

  

  const handleCreateClients = async () => {
    setCreandoClientes(true);
    for (let i = 0; i < 20; i++) {    
      const dataUser = {
        cityUser: "CDMX",
        cuponType: "store",
        email: `ppruebasClientesEstress${String(myId())}@testing.com`,
        gender: "male",
        maritalStatus: "single",
        materno: "Hernandez",
        nameUser: "Juan",
        newsLetter: false,
        paterno: "Perez",
        privacy: true,
        tyc: true,
        zipCode: "11111",
        dataID: {},
        userEnv: "",
        createdDate: ""
      };
      const result = await createNewUser(dataUser);
      if(result) setResBack(true);
      const tempObj = {
        email: dataUser.email,
        idAptos: result.idAptos,
        idCL: result.idCL,
      };
      agregarCliente(tempObj);
      
      console.log(
        `ronda:${i}...${result.idAptos},:..${result.idCL},:..${result.idMF}`
      );
    }
    setCreandoClientes(false);
  }
  
  const agregarCliente = (cliente)=>{

    setNuevoCliente(cliente);
    /*let tempArray = [...myClients];
    tempArray.push(cliente);
    console.log('tempArray:..',tempArray);
    setMyClients([...tempArray]);*/
  }

  const handleSaludo = async () => {
    try {
      const response = await axios.get("/getSaludo");
      console.log("response:..", response);
      return response;
    } catch (error) {
      console.log(error);
      return error;
    }
  };

  return (
    <div className="bg-secondary p-5">
      <h1 className="text-primary text-center m-3 bg-light p-3 rounded w-75 ms-auto me-auto">
        Cliente pruebas de Estress:...
      </h1>
      <button
        onClick={handleCreateClients}
        className="btn btn-danger fs-3 d-block ms-auto me-auto m-3 p-3 "
      >
        Crear clientes:..
      </button>
      {/* <button onClick={handleSaludo} className='btn btn-danger fs-3 d-block ms-auto me-auto m-3 p-3 '>Get Saludo</button> */}
      {creandoClientes && (
        <h6 className="text-dark bg-dark bg-opacity-10 text-center m-3 p-3">
          Creando clientes...
          {creandoClientes&& <Spinner/>}
        </h6>
      )}
      {myClients?.length > 0 &&
        myClients.map((item,index) => {
          return (
            <div key={myId()} className="bg-darck bg-opacity-10">
              <h5 className="text-dark">Cliente: {index+1} </h5>
              <h6 className="text-white">Email: {item.email}</h6>
              <h6>
                idAptos: {item.idAptos} idCL: {item.idCL}
              </h6>
            </div>
          );
        })}
    </div>
  );
};

export default Home;
