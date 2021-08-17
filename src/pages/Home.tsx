import todoIllustration from "../assets/images/undraw_chore_list_re_2lq8.svg";
import { ShareIcon, DeviceMobileIcon, EyeOffIcon } from "@heroicons/react/outline";
const Home = () => {
  return (
    <div className="container">
      <section id="home-page" className="p-4 mx-auto">
        <h2 className="text-center text-3xl font-bold text-red-400">
          Keep track of everything you want on Instagram
        </h2>
        <p className="my-2 text-center">
          "It's a wishlist for instagram, it's not rocket science." - dev team
        </p>
        <img
          className="my-10 mx-auto w-3/5"
          src={todoIllustration}
          alt="todo list"
        />
      </section>
      <section
        id="features"
        className="bg-red-400 p-4 w-full text-gray-100 text-center"
      >
        <h2 className="text-xl font-semibold sm:text-left">Features</h2>
        <div className="flex flex-col md:flex-row m-3 gap-6">
          <div className="flex-1">
            <h3>Share your list with your imaginary friends</h3>
            <ShareIcon className="h-5 w-5 mx-auto mt-3" />
          </div>
          <div className="flex-1">
            <h3>Update your list on any device</h3>
            <DeviceMobileIcon className="h-5 w-5 mx-auto mt-3" />
          </div>
          <div className="flex-1">
            <h3>Set your list as private if you feel ashamed about what you like</h3>
            <EyeOffIcon className="h-5 w-5 mx-auto mt-3" />
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
