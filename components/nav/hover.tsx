import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "../ui/hover-card";

interface NavLinkProps {
  name: string;
  dropdown?: { name: string; link: string }[]; // Make dropdown optional
}

const style = {
  food: "bg-[#ffe0cc] border-[#ffc8a3] text-[#b74d1a] hover:text-white",
};

const MyHoverCard: React.FC<NavLinkProps> = ({ name, dropdown }) => {
  return (
    <HoverCard>
      <HoverCardTrigger>{name}</HoverCardTrigger>
      {dropdown &&
        dropdown.length > 0 && ( // Render only if dropdown is defined and not empty
          <HoverCardContent
            className={`mt-4 p-4     ${
              name === "Foods"
                ? "bg-[#ffe0cc] border-[#ffc8a3] text-[#b74d1a] opacity-100"
                : name === "Contact"
                ? "bg-green-100"
                : "bg-white"
            }`}
          >
            <div className="grid grid-cols-3 gap-4">
              <div className="px-8 py-8">{name.toUpperCase()}</div>

              <div>
                <ul className="flex flex-col">
                  {dropdown
                    .slice(0, Math.ceil(dropdown.length / 2))
                    .map((item) => (
                      <li
                        key={item.name}
                        className={`px-10 py-2 text-sm ${
                          name === "Foods"
                            ? style.food
                            : name === "Contact"
                            ? "bg-green-100"
                            : "bg-white"
                        }`}
                      >
                        <a href={item.link}>{item.name}</a>
                      </li>
                    ))}
                </ul>
              </div>

              <div>
                <ul className="flex flex-col">
                  {dropdown
                    .slice(Math.ceil(dropdown.length / 2))
                    .map((item) => (
                      <li
                        key={item.name}
                        className={`px-10 py-2 text-sm ${
                          name === "Foods"
                            ? style.food
                            : name === "Contact"
                            ? "bg-green-100"
                            : "bg-white"
                        }`}
                      >
                        <a href={item.link}>{item.name}</a>
                      </li>
                    ))}
                </ul>
              </div>
            </div>
          </HoverCardContent>
        )}
    </HoverCard>
  );
};

export default MyHoverCard;
