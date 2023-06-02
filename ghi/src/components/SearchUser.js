import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

function SearchUserList() {
  const [accounts, setAccounts] = useState([]);
  const [user, setUser] = useState("");
  const [searchString, setSearchString] = useState("");

  const handleUserChange = (event) => {
    const value = event.target.value;
    setUser(value);
  };

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    setSearchString(user);
  };

  const fetchAccountList = async () => {
    const listUrl = `http://localhost:8000/api/accounts/`;
    const fetchList = await fetch(listUrl);
    if (fetchList.ok) {
      const data = await fetchList.json();
      console.log(data);
      setAccounts(data);
    }
  };
  useEffect(() => {
    fetchAccountList();
  }, []);
  console.log(accounts);

  return (
    <>
      <div className="flex flex-col items-center justify-center">
        <div className="mt-4 d-flex flex-row-reverse align-items-center justify-content-between">
          <div>
            <div className="input-group flex flex-col">
              <input
                className="m-2 text-white right-2.5 bg-amber-600 hover:bg-orange-400 focus:ring-4 focus:outline-none focus:ring-orange-400 font-medium rounded-lg text-sm px-4 py-2 dark:bg-orange-600 dark:hover:bg-orange-700 dark:focus:ring-orange-800"
                type="text"
                id="usernameinput"
                name="usernameinput"
                placeholder="Search Users"
                maxLength="25"
                onChange={handleUserChange}
                value={user}
              ></input>
              <motion.button
                className="m-2 text-white right-2.5 bg-amber-600 hover:bg-orange-400 focus:ring-4 focus:outline-none focus:ring-orange-400 font-medium rounded-lg text-sm px-4 py-2 dark:bg-orange-600 dark:hover:bg-orange-700 dark:focus:ring-orange-800"
                whileHover={{
                  scale: 1.1,
                  transition: { duration: 0.1 },
                }}
                whileTap={{ scale: 0.9 }}
              >
                Search Users
              </motion.button>
            </div>
          </div>
          <div className="p-2 flex-fill"></div>
        </div>
        <table className="table-layout: auto;">
          <thead>
            <tr>
              <th>Name</th>
              <th>Username</th>
            </tr>
          </thead>
          <tbody>
            {accounts &&
              accounts.map((account) => {
                return (
                  (account.username
                    .toLowerCase()
                    .includes(searchString.toLowerCase()) ||
                    account.name
                      .toLowerCase()
                      .includes(searchString.toLowerCase()) ||
                    account.email
                      .toLowerCase()
                      .includes(searchString.toLowerCase())) && (
                    <tr key={account.username}>
                      <td>{account.name}</td>
                      <td>{account.username}</td>
                    </tr>
                  )
                );
              })}
          </tbody>
        </table>
      </div>
    </>
  );
}
export default SearchUserList;