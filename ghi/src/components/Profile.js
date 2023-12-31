import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import pic from "../images/gold-icon.png";
import deleteIcon from "../images/delete-icon.svg";
import useToken from "@galvanize-inc/jwtdown-for-react";
import { useNavigate } from "react-router-dom";
import ImageModal from "./imageFocusModal";

function Profile({ userData, setUserData, setUsername, setSearchTerm }) {
  const [pins, setPins] = useState([]);
  const [profile, setProfile] = useState([]);
  const params = useParams();
  const { token } = useToken();
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(
    params.username === userData.username
  );
  const [showModal, setShowModal] = useState(false);
  const [modalInformation, setModalInformation] = useState({});


  function imageClicked(pin) {
    setModalInformation(pin);
    setShowModal(true);
  }

  const transition = { duration: 0.6, ease: [0.43, 0.13, 0.23, 0.96] };

  const handleGetLoggedInUser = async () => {
    const url = `${process.env.REACT_APP_USER_SERVICE_API_HOST}/token`;
    fetch(url, {
      credentials: "include",
    })
      .then((response) => response.json())
      .then((data) => {
        setUserData(data.account);
        setUsername(data.account.username);
        setIsLoggedIn(params.username === data.account.username);
      })
      .catch((error) => console.error(error));
  };

  const handleEditProfile = async () => {
    navigate(`/profile/${params.username}/update`);
  };

  const deletePin = async (event, id) => {
    event.preventDefault();
    const url = `${process.env.REACT_APP_USER_SERVICE_API_HOST}/api/pins/${id}`;
    const response = await fetch(url, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`, // Include our authorization token here
      },
    });
    if (response.ok) {
      setPins(pins.filter((pin) => pin.id !== id));
    }
  };

  const fetchData = async () => {
    const fetchUrl = `${process.env.REACT_APP_USER_SERVICE_API_HOST}/api/accounts/69?username=${params.username}`;
    const response = await fetch(fetchUrl);
    if (response.ok) {
      const data = await response.json();
      setProfile(data);
    }
  };

  const fetchPins = async () => {
    const pinsUrl = `${process.env.REACT_APP_USER_SERVICE_API_HOST}/api/pins?username=${params.username}`;
    const response = await fetch(pinsUrl);
    if (response.ok) {
      const pinsData = await response.json();
      setPins(pinsData);
    }
  };

  useEffect(() => {
    handleGetLoggedInUser();
    fetchData();
    fetchPins();
    // eslint-disable-next-line
  }, [params, showModal]);


  return (
    <main>
      {showModal && ( <ImageModal pin={modalInformation} setShowModal={setShowModal} setSearchTerm={setSearchTerm} /> )}
      <div className="m-3 mx-auto px-4 flex flex-col justify-center items-center">
        <div>{profile.name}</div>
        <motion.img
          className="m-3 w-20 h-20 rounded-full object-cover"
          src={profile.profile_pic ?? pic}
          alt="Rounded avatar"
          whileHover={{
            scale: 1.2,
            transition: { duration: 0.2 },
          }}
          transition={transition}
        />
        {isLoggedIn ? (
          <motion.button
            type="submit"
            className="m-2 text-white right-2.5 bg-amber-600 hover:bg-orange-400 focus:ring-4 focus:outline-none focus:ring-orange-400 font-medium rounded-lg text-sm px-4 py-2 dark:bg-orange-600 dark:hover:bg-orange-700 dark:focus:ring-orange-800"
            whileHover={{
              scale: 1.1,
              transition: { duration: 0.2 },
            }}
            whileTap={{ scale: 0.9 }}
            onClick={handleEditProfile}
          >
            Edit Profile
          </motion.button>
        ) : null}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {pins.map((pin, i) => {
            return (
              <div
                className="flex flex-col items-center h-auto max-w-full rounded-lg"
                onClick={() => imageClicked(pin)}
                key={pin.id}
              >
                <motion.div
                  className="flex items-center flex-col"
                  whileHover={{ scale: 1.1, transition: { duration: 0.3 } }}
                >
                  <motion.img
                    initial={{
                      opacity: 0,
                      translateY: 100,
                    }}
                    animate={{ opacity: 1, translateX: 0, translateY: 0 }}
                    transition={{ duration: 0.3, delay: i * 0.05 }}
                    className="hover:z-0 z-4 rounded-xl w-96 h-56 object-cover"
                    src={pin.image_url}
                    alt="List of Pins"
                  />
                  {isLoggedIn ? (
                    <motion.img
                      src={deleteIcon}
                      initial={{ opacity: 0 }}
                      whileHover={{
                        opacity: 1,
                        transition: { duration: 0.05 },
                      }}
                      alt="delete-icon"
                      className="absolute z-3 top-0 right-0 w-10"
                      onClick={(event) => deletePin(event, pin.id)}
                    />
                  ) : (
                    <></>
                  )}
                  <p>{pin.location_name}</p>
                </motion.div>
              </div>
            );
          })}
        </div>
      </div>
    </main>
  );
}
export default Profile;
