import Link from "next/link"

const Footer = () => {
  return (
    <footer className="border-gray-200 inset-x-0 text-sm justify-between bottom-0 text-center bg-red-400 text-gray-100 font-semibold px-6 mx-auto flex">
      <Link href="https://twitter.com/diegoalzate00" className="w-full block p-3 text-center">
        Contact
      </Link>
      <Link href="https://github.com/diegoalzate/instalist" className="w-full block p-3 text-center">
        Github
      </Link>
      <Link href="https://twitter.com/diegoalzate00" className="w-full block p-3 text-center">
        Twitter
      </Link>
    </footer>
  )
}

export default Footer
