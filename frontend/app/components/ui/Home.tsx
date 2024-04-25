import React from "react";
import Socket from "@/app/utils/Socket";
import { useRouter } from "next/navigation";

interface HomeProps {
  setUsername: (username: string) => void;
}

const Home: React.FC<HomeProps> = (props) => {
  const [usernameInput, setUsernameInput] = React.useState("");
  const router = useRouter();

  return (
    <div className="flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-md p-8 max-w-md w-full">
        <h1 className="text-4xl font-semibold mb-1 text-center ">Aakriti</h1>
        <p className="text-sm  mb-4 text-center italic text-gray-400">
          Unleash your drawing and vocab
        </p>
        <form
          onSubmit={(ev) => {
            ev.preventDefault();
            if (usernameInput === "") {
              return;
            }
            props.setUsername(usernameInput);
            Socket.initializeSocket(usernameInput);
            router.push("/play");
          }}
          className="flex flex-col gap-4"
        >
          <input
            type="text"
            placeholder="Enter your username"
            value={usernameInput}
            onChange={(ev) => setUsernameInput(ev.target.value)}
            className="p-3 rounded border border-gray-300 focus:outline-none focus:border-orange-500"
          />
          <button
            type="submit"
            className="bg-orange-600 text-white py-3 rounded hover:bg-orange-700 transition-colors duration-300 uppercase"
          >
            Play Game
          </button>
        </form>
      </div>
    </div>
  );
};

export default Home;
