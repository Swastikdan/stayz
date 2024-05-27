import Link from 'next/link';

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className=" mt-10  border-t-[1px] px-10 py-5">
      <div className=" flex flex-col items-center sm:flex-row sm:justify-between">
        <p className="font-sora text-sm ">
          &copy; {year}. <Link href="/">Urban Utopia</Link> . All rights
          reserved.
        </p>

        <ul className="mt-8 flex flex-wrap justify-start gap-4  text-xs sm:mt-0 sm:text-sm lg:justify-end">
          <li>
            <Link
              href="/pages/terms-and-conditions"
              className="transition-all duration-200 hover:underline "
            >
              Terms & Conditions
            </Link>
          </li>

          <li>
            <Link
              href="/pages/privacy-policy"
              className="transition-all duration-200 hover:underline "
            >
              Privacy Policy
            </Link>
          </li>

          <li>
            <Link
              href="/pages/cookies"
              className="transition-all duration-200 hover:underline "
            >
              Cookies
            </Link>
          </li>
        </ul>
      </div>
    </footer>
  );
}
