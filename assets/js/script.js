class User {
  constructor(users) {
    this.users = users;
  }
  getUser(name){
    let found = this.users.find(user => {
        
        if(user.name.toUpperCase().includes(name.toUpperCase())){
            return user
        }else{
            return false
        }
    })
    return found;
  }
  getNamesUsers() {
    let arrayNames = [];
    this.users.forEach(users => {
        arrayNames.push(users.name)
    });
    return arrayNames;
  }
  getInfoByName(name){
    let found = this.getUser(name);
    if(found){
        return {username: found.username, email: found.email}
    }else {
        return false;
    }
  }
  getAddressByName(name){
    let found = this.users.find(user => {
        
        if(user.name.toUpperCase().includes(name.toUpperCase())){
            return user
        }else{
            return false
        }
    })
    if(found){
        return {street: found.address.street, suite: found.address.suite, city: found.address.city, zipcode: found.address.zipcode}
    }else {
        return false;
    }
  }
  getCompanyByName(name){
    let found = this.users.find(user => {
        
        if(user.name.toUpperCase().includes(name.toUpperCase())){
            return user
        }else{
            return false
        }
    })
    if(found){
        return {phone: found.phone, website: found.website, companyName: found.company.name, catchPhrase: found.company.catchPhrase}
    }else {
        return false;
    }
  }
}

let objUser = new User();


window.onload = () => {
  const xhr = new XMLHttpRequest();
  xhr.withCredentials = true;

  xhr.addEventListener("readystatechange", function () {
    if (this.readyState === 4) {
        objUser.users = JSON.parse(this.responseText);
    }
  });

  xhr.open("GET", "https://jsonplaceholder.typicode.com/users");

  xhr.send();
};


//REQUERIMINETO 1
listarNombres.addEventListener("click", () => {
    let arrayNames = objUser.getNamesUsers();
    let acumulador = "";
    arrayNames.forEach((name, index) => {
        acumulador += `<p>${index+1}: ${name}</p>`
    })

    names.innerHTML = acumulador;
})

//REQUERIMIENTO 2
infoByName.addEventListener("click", () => {
    let info = objUser.getInfoByName(prompt("Ingrese nombre a buscar:"));
    if(info){
        dataByName.innerHTML = `
                    <p>Username: ${info.username}</p>
                    <p>Email: ${info.email}</p>
    `
    }else{
        alert("Usuario no encontrado.")
    }

})

//REQUERIMIENTO 3
addressByName.addEventListener("click", () => {
    let info = objUser.getAddressByName(prompt("Ingrese nombre a buscar:"));
    if(info){
        
        dataAddressByName.innerHTML = `
                    <p>Calle: ${info.street}</p>
                    <p>Depto: ${info.suite}</p>
                    <p>Ciudad: ${info.city}</p>
                    <p>Código postal: ${info.zipcode}</p>
    `
    }else{
        alert("Usuario no encontrado.")
    }
})
//REQUERIMIENTO 4
companyByName.addEventListener("click", () => {
    let info = objUser.getCompanyByName(prompt("Ingrese nombre a buscar:"));
    if(info){

        dataCompanyByName.innerHTML = `
                    <p>Teléfono: ${info.phone}</p>
                    <p>Sitio Web: ${info.website}</p>
                    <p>Compañía: ${info.companyName} - ${info.catchPhrase} </p>
    `
    }else{
        alert("Usuario no encontrado.")
    }

})

