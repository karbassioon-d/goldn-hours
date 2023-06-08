import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import notFound from "../images/not_found.png";
import { NavLink } from "react-router-dom";
import pic from "../images/gold-icon.png";

const LocationList = ({ searchTerm }) => {
  const [pins, setPins] = useState([]);
  const params = useParams();
  const searchRange = 1;

  const fetchPins = async () => {
    const pinsUrl = `${process.env.REACT_APP_USER_SERVICE_API_HOST}/api/pins?lat=${params.latitude}&long=${params.longitude}&radius=${searchRange}`;
    const response = await fetch(pinsUrl);
    if (response.ok) {
      const pinsData = await response.json();
      setPins(pinsData);
    }
  };

  useEffect(() => {
    fetchPins();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params]);

  return (
    <div>
      <h1 className="text-center underline text-2xl m-4">{searchTerm}</h1>
      {pins.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {pins.map((pin) => {
            return (
              <div
                className="flex flex-col items-center h-auto max-w-full rounded-lg"
                key={pin.id}
              >
                <img
                  className="relative m-3 rounded-xl w-96 h-56 object-cover"
                  src={pin.image_url}
                  alt="pin"
                ></img>
                <p>{pin.location_name}</p>
                <div className="flex flex-row items-center m-1">
                  <img alt="profile picture" src={pin.profile_pic ?? pic } className="rounded-full w-6 h-6 object-cover" />
                  <NavLink to={`/profile/${pin.username}`} className="ml-1" >
                    {pin.username}
                  </NavLink>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="w-100 h-screen flex flex-col justify-center items-center">
          <img
            className="w-1/2 rounded-3xl m-3"
            src={notFound}
            alt="Not Found"
          />
          <h1>NO POSTS</h1>
        </div>
      )}
    </div>
  );
};

export default LocationList;
