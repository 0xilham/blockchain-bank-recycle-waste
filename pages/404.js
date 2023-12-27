import Layout from "../components/Layout/Layout";
import SeoHead from "../components/SeoHead";
import Link from "next/link";

export default function Halaman404() {
  return (
    <>
      <SeoHead title="Terjadi Error | Bank Recycle Waste" />
      <Layout>
        <div class="grid items-center justify-center min-h-screen text-center content-center">
          <h1 class="mb-4 text-6xl font-semibold text-red-500">404</h1>
          <p class="mb-4 text-lg text-gray-600">
            Ups! Sepertinya kamu tersesat.
          </p>
          <div class="animate-bounce">
            <svg
              class="mx-auto h-16 w-16 text-red-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
              ></path>
            </svg>
          </div>
          <p class="mt-4 text-gray-600">
            Ayo kembali ke{" "}
            <Link href="/" class="text-green-500 font-semibold">
              home
            </Link>
            .
          </p>
        </div>
      </Layout>
    </>
  );
}
