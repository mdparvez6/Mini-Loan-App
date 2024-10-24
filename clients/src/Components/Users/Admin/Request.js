import React, { useState, useEffect, useContext } from "react";
import "./admin.scss";
import Loader from "../../Loader/Loader";
import toast from "react-hot-toast";
import GlobalContext from "../../../Context/GlobalContext";

const Request = () => {
  const [loanRequests, setLoanRequests] = useState([]);
  const [loading, setLoading] = useState(false);

  const authToken = localStorage.getItem("token");
  const { allLoansApi, updateLoansApi } = useContext(GlobalContext);
  // console.log(authToken);

  useEffect(() => {
    fetchLoanRequests();
  }, []);

  const fetchLoanRequests = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${allLoansApi}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`,
        },
      });
      // console.log(response);

      const data = await response.json();
      console.log(data);

      setLoanRequests(data?.data || []);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      toast.error("Error fetching loan requests.");
      console.error("Error fetching loan requests:", error);
    }
  };

  const handleStatusChange = async (loanId, newStatus) => {
    try {
      setLoading(true);
      const response = await fetch(`${updateLoansApi}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`,
        },
        body: JSON.stringify({ loanId, state: newStatus }),
      });

      // console.log(response.body);
      // const data = await response.json();
      // console.log(data);

      if (!response.ok) {
        throw new Error(`Request failed with status: ${response.status}`);
      }
    } catch (error) {
      setLoading(false);
      toast.error(`Error updating loan status.`);
      console.error("Error updating loan status:", error);
    } finally {
      setLoading(false); // Ensure loading is set to false
    }
  };

  return (
    <div className="request-container">
      {loading && <Loader />}
      <h2 className="request-heading">Loan Requests</h2>

      {loanRequests.length > 0 ? (
        <div className="table-cntnr" data-aos="fade-right" data-dos-delay="10">
          <table className="table">
            <thead>
              <tr>
                <th>User Name</th>
                <th>Email</th>
                <th>Loan Amount</th>
                <th>Term</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {loanRequests.map((request) => (
                <tr key={request?._id}>
                  <td>{request?.userId?.name || "N/A"}</td>
                  <td>{request?.userId?.email || "N/A"}</td>
                  <td>Rs.{request?.amount || "N/A"}</td>
                  <td>{request?.term} weeks</td>
                  <td>
                    {request?.state === "PENDING" && (
                      <span className="text-blue-500">PENDING</span>
                    )}
                    {request?.state === "APPROVED" && (
                      <span className="text-green-500">APPROVED</span>
                    )}
                    {request?.state === "REJECTED" && (
                      <span className="text-red-500">REJECTED</span>
                    )}
                    {request?.state === "PAID" && (
                      <span className="text-yellow-500">PAID</span>
                    )}
                  </td>
                  <td>
                    {request?.state === "PENDING" ? (
                      <>
                        <button
                          onClick={() =>
                            handleStatusChange(request?._id, "APPROVED")
                          }
                          className="btn-approve"
                          disabled={loading}
                        >
                          Approve
                        </button>
                        <button
                          onClick={() =>
                            handleStatusChange(request?._id, "REJECTED")
                          }
                          className="btn-reject"
                          disabled={loading}
                        >
                          Reject
                        </button>
                      </>
                    ) : (
                      <button disabled className="btn-done">
                        Done
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="no-requests-message">No loan requests to show.</p>
      )}
    </div>
  );
};

export default Request;
