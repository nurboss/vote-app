import React, { useState, useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";
import VoteCard from "./components/VoteCard";

const App = () => {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [disable, setDisable] = useState(false);

  useEffect(() => {
    // Check local storage for disable data
    const storedDisable = localStorage.getItem("disable");
    if (storedDisable !== null) {
      setDisable(JSON.parse(storedDisable));
    } else {
      // If no data found in local storage, set disable to false
      localStorage.setItem("disable", JSON.stringify(false));
    }

    fetchData();
  }, [members]);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        "https://vote-server-iota.vercel.app/api/vote"
      );
      setMembers(response.data.result);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  const patchData = async (id) => {
    try {
      const response = await axios.patch(
        `https://vote-server-iota.vercel.app/api/vote/${id}`
      );
      console.log(response.data);
      if (response.data.message === "Vote was updated successfully!") {
        toast.success("Successfully toasted!");

        // Update local storage with disable set to true
        localStorage.setItem("disable", JSON.stringify(true));

        setDisable(true);
        // fetchData();
      }
    } catch (error) {
      toast.error("This didn't work.");
      console.error("Error patch data:", error);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-slate-900 text-white px-5 font-Anek_Bangla">
      <h1 className="text-3xl font-bold mb-8 text-center">
        উখিয়া টেকনাফে দ্বাদশ নির্বাচনের সম্ভাব্য জরিপ
      </h1>
      {loading ? (
        <h1>Loading........</h1>
      ) : (
        <div className="flex flex-col gap-5">
          {members.map((member) => (
            <VoteCard
              key={member._id}
              member={member}
              onIncrement={patchData}
              disable={disable}
            />
          ))}
        </div>
      )}
      <Toaster position="top-center" reverseOrder={false} />
    </div>
  );
};

export default App;
