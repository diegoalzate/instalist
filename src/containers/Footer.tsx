const Footer = () => {
    const currentYear = new Date().getFullYear();
    return (
        <footer className="fixed border-gray-200 border-t-2 inset-x-0 text-sm justify-between bottom-0 text-center bg-red-400 text-gray-100 font-semibold px-6 mx-auto flex">
            <a href="#" className="w-full block p-3 text-center">Profile</a>
            <a href="#" className="w-full block p-3 text-center">Home</a>
            <a href="#" className="w-full block p-3 text-center">Settings</a>
        </footer>
    );
}

export default Footer;