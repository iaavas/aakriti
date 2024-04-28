import React from "react";
import { useGame } from "../context/GameContext";

const Scoreboard: React.FC = () => {
  const { users, activeUserId } = useGame();

  if (!users) return null;

  const usersSorted = users.sort((userA, userB) => {
    if (userA.score < userB.score) {
      return 1;
    } else if (userA.score > userB.score) {
      return -1;
    } else {
      return 0;
    }
  });

  const rankings: Record<string, number> = {};
  usersSorted.forEach((user, idx) => (rankings[user.id] = idx + 1));

  return (
    <div className="w-1/4 h-2/3 flex flex-col  bg-white rounded-sm ">
      <div className="overflow-x-auto p-2">
        <table className="w-full ">
          <tbody>
            {users.map((user, index) => (
              <tr
                key={user.id}
                className={`${
                  index % 2 === 0 ? "bg-gray-100" : "bg-white"
                } hover:bg-gray-200 transition-colors duration-200 `}
              >
                <td className="px-4 py-2">
                  <span className="font-semibold">#{rankings[user.id]}</span>
                </td>
                <td className="px-4 py-2">
                  <div className="flex items-center flex-col justify-center">
                    <span className="font-semibold ">{user.username}</span>
                    <span>{user.score} points</span>
                    {user.id === activeUserId && (
                      <span className=" text-green-500">&#9998;</span>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Scoreboard;
