import { IoMdDocument } from "react-icons/io";

export default function Header() {
  return (
    <nav className="bg-neutral-800 flex items-center px-5 py-4">
      <IoMdDocument color="#4255FF" size={28} />
      <h1 className="text-quizlet-white text-xl font-bold ml-2">
        Quizlet To JSON
      </h1>
    </nav>
  );
}
