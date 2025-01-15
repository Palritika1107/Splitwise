import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const GroupCard = () => {
  const [groups, setGroups] = useState([]); // State to store the user's groups
  const [loading, setLoading] = useState(true); // Loading state

  // Fetch groups on component mount
  useEffect(() => {
    const fetchGroups = async () => {
      try {
        const token = localStorage.getItem("token"); // Get the token for authentication
        const response = await axios.get("/me", {
          headers: { token },
        });
        let groupList = response.data.user.groups;
        console.log(`groupList : ${groupList}`);

        let tempGroupList = [];

        for(let i=0;i<groupList.length;i++){

          console.log(`groupList[i] : ${groupList[i]}`);

          const groupObj = await axios.get(`/get-group/?groupId=${groupList[i]}`);
          console.log(groupObj);

          tempGroupList.push(groupObj.data.group);

        }

        setGroups(tempGroupList); // Assuming API response has a `groups` field
        console.log(groups);
      } catch (error) {
        console.error("Error fetching groups:", error);
      } finally {
        setLoading(false); // Stop loading regardless of success or error
      }
    };

    fetchGroups();
  }, []);

  // Render loading message if data is still being fetched
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-lg font-semibold">Loading Groups...</p>
      </div>
    );
  }

  return (
    <>
      <section id="groups" className="p-6 my-12 scroll-mt-20">
        <h2 className="text-4xl font-bold text-center sm:text-5xl mb-6 text-slate-900 dark:text-white">
          Groups
        </h2>
        {groups.length > 0 ? (
       
          
          <ul className="list-none mx-auto my-12 flex flex-col sm:flex-row items-center gap-8">
            {groups.map((group, index) => (
              <Link
              key={group._id}
              to={{
                pathname: `/group/${group._id}`,
              }}
              state={{ groupName: group.name, groupId: group._id }}
              className="text-blue-500 hover:underline"
            >
              <li
                
                className="w-2/3 sm:w-5/6 flex flex-col items-center border border-solid border-slate-900 dark:border-gray-100 bg-white dark:bg-black py-6 px-2 rounded-3xl shadow-xl"
              >
                <img
                  src="./img/rocketdab.png"
                  alt="Group"
                  className="w-1/2 mb-6"
                />
                <h3 className="text-3xl text-center text-slate-900 dark:text-white">
                  🔖 {group.groupName}
                </h3>
                <p className="text-center text-slate-500 dark:text-slate-400 mt-2">
                  {group.members.length} Members
                </p>
              </li>
            </Link>
            ))}
          </ul>
        ) : (
          <p className="text-center text-xl text-slate-500 dark:text-slate-400">
            You don't belong to any groups yet.
          </p>
        )}
      </section>
      <hr className="mx-auto bg-black dark:bg-white w-1/2" />
    </>
  );
};

export default GroupCard;
