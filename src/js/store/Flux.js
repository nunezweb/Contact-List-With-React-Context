const getState = ({ getStore, getActions, setStore }) => {
  return {
    store: {
      contacts: [],
      apiUrl: "https://playground.4geeks.com/contact/agendas",
      user: "nunezweb",
    },
    actions: {
      createContactList: async () => {
        const store = getStore();
        try {
          const response = await fetch(`${store.apiUrl}/${store.user}`, {
            method: "POST",
          });
          const data = await response.json();
          if (response.ok) {
            return true;
          }
          return false;
        } catch (error) {
          console.error("Error", error);
          return false;
        }
      },
      getContacts: async () => {
        const store = getStore();
        try {
          const response = await fetch(
            `${store.apiUrl}/${store.user}/contacts`
          );
          const data = await response.json();
          if (response.ok) {
            setStore({ contacts: data.contacts });
            return true;
          }
          setStore({ contacts: false });
          return false;
        } catch (error) {
          console.error("Error", error);
          setStore({ contacts: false });
          return false;
        }
      },
      addContact: async (contact) => {
        const store = getStore();
        const actions = getActions();
        try {
          const response = await fetch(
            `${store.apiUrl}/${store.user}/contacts`,
            {
              method: "POST",
              body: JSON.stringify(contact),
              headers: {
                "Content-Type": "application/json",
              },
            }
          );
          const data = await response.json();
          if (response.ok) {
            actions.getContacts();
            return true;
          }
          return false;
        } catch (error) {
          console.error("Error", error);
          return false;
        }
      },
      editContact: async (contact, id) => {
        const store = getStore();
        const actions = getActions();

        try {
          const response = await fetch(
            `${store.apiUrl}/${store.user}/contacts/${id}`,
            {
              method: "PUT",
              body: JSON.stringify(contact),
              headers: {
                "Content-Type": "application/json",
              },
            }
          );
          const data = await response.json();
          if (response.ok) {
            actions.getContacts();
            return true;
          }
          return false;
        } catch (error) {
          console.error("Error", error);
          return false;
        }
      },
      deleteContact: async (id) => {
        const store = getStore();
        const actions = getActions();

        try {
          const response = await fetch(
            `${store.apiUrl}/${store.user}/contacts/${id}`,
            { method: "DELETE" }
          );
          const data = await response;
          if (response.ok) {
            actions.getContacts();
            return true;
          }
          return false;
        } catch (error) {
          console.error("Error", error);
          return false;
        }
      },
    },
  };
};

export default getState;
