const contacts = require("./contacts");
const { Command } = require("commander");
const program = new Command();
program
  .option("-a, --action <list>", "choose action")
  .option("-i, --id <get>", "user id")
  .option("-i, --id <remove>", "user id")
  .option("-n, --name <add>", "user name")
  .option("-e, --email <add>", "user email")
  .option("-p, --phone <add>", "user phone")
  .option("-n, --name <update>", "user name")
  .option("-e, --email <update>", "user email")
  .option("-p, --phone <update>", "user phone");

program.parse(process.argv);

const argv = program.opts();

function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
      contacts.listContacts().then((data) => console.table(data));
      break;

    case "get":
      contacts.getContactById(id).then((data) => console.table(data));
      break;

    case "add":
      contacts
        .addContact(name, email, phone)
        .then((data) => console.table(data));
      break;

    case "remove":
      contacts.removeContact(id).then((data) => console.table(data));
      break;
    case "update":
      contacts
        .updateById({ id, name, email, phone })
        .then((data) => console.table(data));
      break;
    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}

invokeAction(argv);
