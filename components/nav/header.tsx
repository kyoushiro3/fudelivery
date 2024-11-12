import NavLink from "./navlink";
import MyHoverCard from "./hover";

interface NavLinkProps {
  name: string;
  link: string;
  dropdown?: { name: string; link: string }[]; // Make dropdown optional
}

export default function Header() {
  const nav_links: NavLinkProps[] = [
    {
      name: "Home",
      link: "/",
    },
    {
      name: "Foods",
      link: "/allFood",
      dropdown: [
        { name: "Burgers & Sandwiches", link: "/foods/addFood" },
        { name: "Pasta & Noodles", link: "/" },
        { name: "Pizza", link: "/" },
        { name: "Salads", link: "/" },
        { name: "Sushi & Japanese", link: "/" },
        { name: "Mexican & Tacos", link: "/" },
        { name: "BBQ & Grill", link: "/" },
        { name: "Fried Chicken & Wings", link: "/" },
        { name: "Indian & Curry", link: "/" },
        { name: "Chinese & Dim Sum", link: "/" },
        { name: "Vegan & Vegetarian", link: "/" },
        { name: "Breakfast & Brunch", link: "/" },
        { name: "Desserts & Sweets", link: "/" },
        { name: "Smoothies & Beverages", link: "/" },
      ],
    },
    {
      name: "About Us",
      link: "/about",
      dropdown: [
        { name: "About Us", link: "/" },
        { name: "About Us", link: "/" },
      ],
    },
    {
      name: "Contact",
      link: "/contact",
    },
  ];

  // const social = [
  //   {
  //     name: "Facebook",
  //     link: "/",
  //     icon: "",
  //   },
  //   {
  //     name: "Instagram",
  //     link: "/",
  //   },
  // ];

  // const [hoveredLink, setHoveredLink] = useState<string | null>(null);

  return (
    <div className="mt-7 px-4 sm:px-6 md:px-12 lg:px-20 text-sm font-medium z-50">
      <div className="px-4 py-4 flex flex-row justify-between items-center">
        <div className="flex gap-2 items-center rounded-lg border border-black bg-[#eab308]">
          <svg
            width="40"
            height="40"
            viewBox="0 0 381 381"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M123.769 308.849C127.215 314.568 128.939 317.428 130.543 319.185C140.036 329.582 156.399 329.612 165.93 319.25C167.541 317.499 169.275 314.646 172.742 308.939L181.011 295.331C185.061 288.665 187.087 285.332 189.853 282.904C192.363 280.7 195.306 279.045 198.493 278.044C202.005 276.941 205.905 276.941 213.705 276.941H247.036C252.222 276.941 254.814 276.941 257.204 276.45C262.098 275.445 266.557 272.937 269.957 269.276C271.618 267.489 272.964 265.273 275.657 260.842L287.441 241.448C295.834 227.636 285.891 209.961 269.73 209.961H252.479C243.885 209.961 238.597 200.561 243.06 193.216V193.216C247.523 185.871 242.236 176.47 233.641 176.47H202.354C199.831 176.47 198.57 176.47 197.391 176.587C190.708 177.249 184.607 180.68 180.571 186.048C179.859 186.995 179.205 188.073 177.895 190.229L123.823 279.215C122.42 281.525 121.718 282.68 121.181 283.818C118.129 290.279 118.115 297.764 121.143 304.237C121.676 305.377 122.374 306.534 123.769 308.849V308.849Z"
              fill="#ffffff"
              stroke="black"
              strokeWidth="8"
            />
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M44.4901 76H219.855L330.977 76C345.622 76 352.945 76 357.602 78.0714C367.289 82.3803 373.001 92.5353 371.653 103.052C371.005 108.107 367.203 114.365 359.597 126.881V126.881C356.905 131.313 355.558 133.528 353.898 135.316C350.497 138.976 346.039 141.484 341.144 142.489C338.755 142.98 336.162 142.98 330.977 142.98H201.747C193.793 142.98 189.817 142.98 186.245 144.124C183.085 145.136 180.169 146.793 177.682 148.989C174.871 151.471 172.835 154.887 168.762 161.72L135.719 217.157C124.849 235.394 119.414 244.512 112.373 247.6C106.23 250.295 99.2383 250.295 93.0944 247.6C86.0542 244.512 80.6191 235.394 69.7488 217.157L16.8445 128.398C13.1572 123.018 11 116.506 11 109.49C11 91.4856 25.2077 76.7994 43.0232 76.0316C43.034 76.0311 43.0439 76.0251 43.0493 76.0158V76.0158C43.0549 76.006 43.0653 76 43.0766 76H44.4901Z"
              fill="#ffffff"
              stroke="black"
              strokeWidth="8"
            />
          </svg>
        </div>

        <div className="ml-24 hidden md:grid lg:grid grid-flow-col gap-2 border border-black bg-[rgba(228,224,217,0.3)] rounded-lg backdrop-blur-xl z-50">
          {" "}
          {nav_links.map(({ name, dropdown }) => (
            <li className="px-[.875em] py-[.75em] list-none" key={name}>
              <NavLink
                key={name}
                href={name}
                className="text-black font-semibold"
                activeClassName="text-yellow-500"
              >
                <MyHoverCard name={name} dropdown={dropdown} />
              </NavLink>
            </li>
          ))}
        </div>

        <div className="flex gap-4">
          <button className=" font-semibold">Login</button>
          <button className="font-semibold border border-black bg-yellow-500 rounded-lg px-[.875em] py-[.75em]">
            Order Now
          </button>
        </div>
      </div>
    </div>
  );
}
