import React, { useEffect, useState } from "react";
import { Card } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { allusers } from "../Services/AllApi";
import LoadingSpinner from "../components/LoadingSpinner";
import { BASE_URL } from "../Services/baseUrl";

function View() {
  const [showspin, setshowspin] = useState(true);

  const [user, setUser] = useState({});

  const { id } = useParams();
  console.log(id);

  // api call for getting single user details
  const getuser = async () => {
    const { data } = await allusers("");
    // console.log(data);

    // console.log(data.find(item=>item._id===id));

    setUser(data.find((item) => item._id === id));
  };

  console.log(user);

  useEffect(() => {
    getuser();

    setTimeout(() => {
      setshowspin(false);
    }, 2000);
  }, []);

  return (
    <>
      {showspin ? (
        <LoadingSpinner />
      ) : (
        <div className="container mt-5" style={{ height: "80vh" }}>
          {user ? (
            <Card className="shadow col-lg-12 mt-5  p-3 ">
              <div className="container">
                <div className="text-center">
                  <img
                    style={{
                      width: "70px",
                      height: "70px",
                      borderRadius: "50%",
                      marginBottom: "20px",
                    }}
                    src={`${BASE_URL}/uploads/${user.profile}`}
                    alt="no image"
                  />
                </div>

                <div className="text-center">
                  <p>
                    User Name : {user.fname}
                    {user.lname}
                  </p>
                  <p>E-mail : {user.email}</p>
                  <p>Mobile : {user.mobile}</p>
                  <p>Gender : {user.gender}</p>
                  <p>Status : {user.status}</p>
                  <p>Loaction : {user.location}</p>
                </div>
              </div>
            </Card>
          ) : (
            ""
          )}
        </div>
      )}
    </>
  );
}

export default View;
