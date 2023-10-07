import Link from "next/link";

const Footer = () => {
  return (
    <footer
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '30px 200px',

        backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32' width='32' height='32' fill='none' stroke='%23171717'%3e%3cpath d='M0 .5H31.5V32'/%3e%3c/svg%3e")`,
      }}
    >
        <Link className="text-gray-100 hover:text-gray-300" href="mailto:mailtoarnavpandey@gmail.com" passHref>
         Contact us
        </Link>
        <div>
            made by <Link className="text-gray-100 hover:text-gray-300"  href="https://siddharthduggal.com">sid</Link> and{" "}
            <Link className="text-gray-100 hover:text-gray-300"  href="https://adityasahas.tech">adi</Link>
        </div>
    </footer>
  );
};

export default Footer;
