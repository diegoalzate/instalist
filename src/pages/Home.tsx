import todoIllustration from "../assets/images/undraw_chore_list_re_2lq8.svg";
import { ShareIcon, DeviceMobileIcon, EyeOffIcon } from "@heroicons/react/outline";
const Home = () => {
  return (
    <div className="container">
      <section id="home-page" className="p-4 grid grid-cols-1 sm:grid-cols-2 justify-center gap-4">
        <div className="flex flex-col gap-6 sm:gap-10 sm:my-10 text-center sm:text-left sm:ml-auto">
          <h2 className="text-3xl font-bold text-red-400 sm:text-6xl">
            Keep track of everything you want on Instagram
          </h2>
          <p>
            "It's a wishlist for instagram, it's not rocket science." - dev team
          </p>
          <button className="font-WorkSans bg-red-400 hover:bg-blue-300 text-gray-100 text-lg font-semibold rounded-lg py-2 px-6 mx-auto"> 
          Start your list for free! 
          </button>
        </div>
        <img
          className="my-10 sm:my-auto mx-auto w-3/5 sm:m-0 sm:w-4/5"
          src={todoIllustration}
          alt="todo list"
        />
      </section>
      <section
        id="features"
        className="bg-red-400 p-4 w-full text-gray-100 text-center"
      >
        <h2 className="text-xl font-bold sm:text-left">Features</h2>
        <div className="flex flex-col md:flex-row m-3 gap-6">
          <div className="flex-1">
            <h3>Share your list with your imaginary friends</h3>
            <ShareIcon className="h-10 w-10 mx-auto mt-3" />
          </div>
          <div className="flex-1">
            <h3>Update your list on any device</h3>
            <DeviceMobileIcon className="h-10 w-10 mx-auto mt-3" />
          </div>
          <div className="flex-1">
            <h3>Set your list as private if you feel ashamed about what you like</h3>
            <EyeOffIcon className="h-10 w-10 mx-auto mt-3" />
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
