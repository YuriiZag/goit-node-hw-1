const fs = require("fs").promises;
const path = require("path");

const contactsPath = path.resolve("contacts.json");


async function getData() {
  const res = await fs.readFile("db/contacts.json");
  return JSON.parse(res);
}

async function writeData(data) {
  const stringifiedData = JSON.stringify(data);
  await fs.writeFile("db/contacts.json", stringifiedData);
}

async function listContacts() {
  const data = await getData();
  console.log(data);
}

async function getContactById(contactId) {
  const data = await getData();
  const contactById = data.find(({ id }) => id === contactId);
  return console.log(contactById);
}

async function removeContact(contactId) {
  const data = await getData();
  const unremovedContacts = data.filter(
    ({ id }) => !(id === contactId)
  );
  writeData(unremovedContacts);
  return console.log(`contact with ${contactId} has been removed`);
}

async function addContact(name, email, phone) {
  const data = await getData();
  const newContact = {
    id: Date.now().toString(),
    name: name,
    email: email,
    phone: phone,
  };
  const upgradedData = [
    ...data, newContact
  ];
  writeData(upgradedData);
  return console.log(newContact)
}

module.exports = { listContacts, addContact, removeContact, getContactById};
