import React from "react";
import { Button } from "react-bootstrap";
import Table from "react-bootstrap/Table";
import { Link } from "react-router-dom";
import { BASE_URL } from "../Services/baseUrl";

function Hometable({ displayData, removeuser }) {
  console.log(displayData);

  return (
    <>
      <div className="container">
        <Table striped bordered hover responsive className="mt-3 shadow">
          <thead>
            <tr className="text-center">
              <th>EMPLOYEE ID</th>
              <th>NAME</th>
              <th>E-MAIL</th>
              <th>MOBILE NO</th>
              <th>STATUS</th>
              <th>PROFILE</th>
              <th>ACTION</th>
            </tr>
          </thead>

          <tbody>
            {displayData.length > 0 ? (
              displayData.map((item, index) => (
                <tr className="text-center">
                  <td className="pt-3 pb-1">{index + 1}</td>
                  <td className="pt-3 pb-1">
                    {item.fname} {item.lname}
                  </td>
                  <td className="pt-3 pb-1">{item.email}</td>
                  <td className="pt-3 pb-1">{item.mobile}</td>
                  <td className="pt-2">
                    <Button
                      className={
                        item.status === "Active" ? "btn-success" : "btn-danger"
                      }
                    >
                      {item.status}
                    </Button>
                  </td>
                  <td>
                    <img
                      style={{
                        width: "70px",
                        height: "70px",
                        borderRadius: "50%",
                      }}
                      src={`${BASE_URL}/uploads/${item.profile}`}
                      alt="no image"
                    />
                  </td>
                  <td>
                    <Link to={`/view/${item._id}`}>
                      <i class="fa-solid fa-eye fs-3 me-2 text-light pt-2"></i>
                    </Link>
                    <Link to={`/edit/${item._id}`}>
                      <i class="fa-solid fa-pen fs-3 me-2 text-light"></i>
                    </Link>
                    <span onClick={() => removeuser(item._id)}>
                      <i class="fa-solid fa-trash fs-3 text-primary"></i>
                    </span>
                  </td>
                </tr>
              ))
            ) : (
              <tr className="text-danger text-center mt-5 w-100">
                Nothing to Display
              </tr>
            )}
          </tbody>
        </Table>
      </div>
    </>
  );
}

export default Hometable;
