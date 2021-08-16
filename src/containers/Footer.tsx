const Footer = () => {
    const currentYear = new Date().getFullYear();
    return (
        <footer className="fixed inset-x-0 bottom-0 py-4 text-center">
            <p>Copyright ⓒ {currentYear}</p>
        </footer>
    );
}

export default Footer;