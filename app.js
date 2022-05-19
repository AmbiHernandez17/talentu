const getData = async () => {
  try {
    const result = await fetch("https://reqres.in/api/users?page=1");
    const parsedResult = await result.json();
    if (parsedResult.ok === false) {
      throw new Error();
    }
    localStorage.setItem("users", JSON.stringify(parsedResult));
  } catch (error) {
    alert("Algo ha salido mal, por favor intente mas tarde");
  }
};
getData();
const persistedData = localStorage.getItem("users");
JSON.parse(persistedData).data.forEach((user) => {
  const tBody = document.getElementById("tableBody");
  const tRow = document.createElement("tr");
  const th = document.createElement("th");
  th.setAttribute("scope", "row");
  th.textContent = user.id;
  tRow.appendChild(th);
  const tdName = document.createElement("td");
  tdName.textContent = `${user.first_name} ${user.last_name}`;
  tRow.appendChild(tdName);
  const tdAge = document.createElement("td");
  if (user.birth_date === undefined) {
    //La api no trae la edad, entonces la genero
    tdAge.textContent = Math.floor(Math.random() * 100);
  } else {
    const birthDate = new Date(user.birth_date);
    const actualDate = new Date();
    tdAge.textContent = actualDate.getFullYear() - birthDate.getFullYear();
  }
  tRow.appendChild(tdAge);
  const tdEmail = document.createElement("td");
  tdEmail.textContent = user.email;
  tRow.appendChild(tdEmail);
  tBody.appendChild(tRow);
});

document.getElementById("btnSubmit").addEventListener("click", () => {
  if (
    document.getElementById("inputEmail").value !== "" &&
    document.getElementById("inputName").value !== "" &&
    document.getElementById("inputLastname").value !== "" &&
    document.getElementById("inputBirthDate").value !== ""
  ) {
    const persistedData = localStorage.getItem("users");
    const parsedPersistedData = JSON.parse(persistedData);
    parsedPersistedData.data.push({
      id: parsedPersistedData.data.length + 1,
      first_name: document.getElementById("inputName").value,
      last_name: document.getElementById("inputLastname").value,
      birth_date: document.getElementById("inputBirthDate").value,
      email: document.getElementById("inputEmail").value,
    });

    document.getElementById("inputName").value = "";
    document.getElementById("inputLastname").value = "";
    document.getElementById("inputBirthDate").value = "";
    document.getElementById("inputEmail").value = "";

    document.getElementById("success").style.display = "block";
    setTimeout(() => {
      document.getElementById("success").style.display = "none";
    }, 5000);
    const tBody = document.getElementById("tableBody");
    const tRow = document.createElement("tr");
    const th = document.createElement("th");
    th.setAttribute("scope", "row");
    th.textContent = parsedPersistedData.data.at(-1).id;
    tRow.appendChild(th);
    const tdName = document.createElement("td");
    tdName.textContent = `${parsedPersistedData.data.at(-1).first_name} ${
      parsedPersistedData.data.at(-1).last_name
    }`;
    tRow.appendChild(tdName);
    const tdAge = document.createElement("td");
    if (parsedPersistedData.data.at(-1).birth_date === undefined) {
      //La api no trae la edad, entonces la genero
      tdAge.textContent = Math.floor(Math.random() * 100);
    } else {
      const birthDate = new Date(parsedPersistedData.data.at(-1).birth_date);
      const actualDate = new Date();
      tdAge.textContent = actualDate.getFullYear() - birthDate.getFullYear();
    }
    tRow.appendChild(tdAge);
    const tdEmail = document.createElement("td");
    tdEmail.textContent = parsedPersistedData.data.at(-1).email;
    tRow.appendChild(tdEmail);
    tBody.appendChild(tRow);
  } else {
    document.getElementById("error").style.display = "block";
    setTimeout(() => {
      document.getElementById("error").style.display = "none";
    }, 5000);
  }
});
