const fs = require("fs").promises;
const path = require("path");
const { nanoid } = require("nanoid");
const contactsPath = path.join(__dirname, "/db/contacts.json");

async function listContacts() {
  const data = await fs.readFile(contactsPath);
  const res = JSON.parse(data);
  return res;
}

async function getContactById(contactId) {
  const data = await listContacts();
  try {
    const result = data.filter(({ id }) => +id === +contactId);
    return result;
  } catch (error) {
    console.error(error);
  }
}

async function removeContact(contactId) {
  const data = await listContacts();
  try {
    const result = data.filter(({ id }) => id !== contactId);
    await fs.writeFile(contactsPath, JSON.stringify(result, null, 2));
    return result;
  } catch (error) {
    console.error(error);
  }
}
async function addContact(name, email, phone) {
  const data = await listContacts();
  try {
    const newContact = { id: nanoid(), name, email, phone };
    data.push(newContact);
    await fs.writeFile(contactsPath, JSON.stringify(data, null, 2));
    return newContact;
  } catch (error) {
    console.error(error);
  }
}

async function updateContact(data) {
  await fs.writeFile(contactsPath, JSON.stringify(data, null, 2));
}
async function updateById({ id, name, email, phone }) {
  const data = await listContacts();
  try {
    const idx = data.findIndex((item) => item.id === id);
    if (idx === -1) {
      return null;
    }
    data[idx] = { id, name, email, phone };
    await updateContact(data);
    return data[idx];
  } catch (error) {
    console.error(error);
  }
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateById,
};
