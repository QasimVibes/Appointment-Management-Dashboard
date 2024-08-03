import Link from "next/link";

export default function Error() {
  return (
    <div className="flex flex-col h-screen justify-center items-center bg-lightwhite px-4">
      <div className="flex flex-col items-center text-center max-w-md">
        <h1 className="text-4xl font-bold text-primary mb-6">
          We can&apos;t find that page.
        </h1>
        <p className="text-secondary mb-8">
          Try searching again, or return home to start from the beginning.
        </p>
        <Link
          href="/"
          className="bg-quaternary text-white px-6 py-3 rounded-lg font-semibold"
        >
          Go Back Home
        </Link>
      </div>
    </div>
  );
}
