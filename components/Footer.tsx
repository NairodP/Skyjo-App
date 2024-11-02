import Link from "next/link";

export default function Footer() {
  return (
    <footer className="font-zillaSlab mt-14 w-full max-w-90 mx-auto p-4 text-center text-xs text-black bg-sky-50 border-t border-gray-200 shadow-[rgba(0,0,10,0.1)_0px_-10px_10px_1px]">
      <div className="space-y-2">
        <p className="font-semibold">
          © {new Date().getFullYear()} - Dorian Pernot. Tous droits réservés.
        </p>
        <Link
          href="mailto:dorianpernot@gmail.com"
          className="text-[#080830] hover:underline"
        >
          - Me contacter -
        </Link>
      </div>
    </footer>
  );
}
