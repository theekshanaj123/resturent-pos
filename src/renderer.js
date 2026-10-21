document.getElementById("test").addEventListener("click", async () => {
  loadUser();
});

document.getElementById("test").addEventListener("click", async () => {
  loadUsers();
});

async function loadUser() {
  const user = await window.api.getUser("USER-001");
  console.log(user);
}

async function loadUsers() {
  const users = await window.api.getUsers();
  console.log(users);
}