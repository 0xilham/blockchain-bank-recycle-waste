import React from "react";
import Link from "next/link";

export default function App() {
  return (
    <footer className="bg-neutral-200 text-center dark:bg-neutral-700 lg:text-left">
      <div className="p-4 text-center text-neutral-700 dark:text-neutral-200">
        © {new Date().getFullYear()} Copyright &nbsp;
        <Link href="/">
          <a className="text-neutral-800 dark:text-neutral-400 font-semibold hover:text-green-500">
            Bank Recycle Waste
          </a>
        </Link>
      </div>
    </footer>
  );
}
