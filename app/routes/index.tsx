import type { MetaFunction } from "remix";

// https://remix.run/api/conventions#meta
const meta: MetaFunction = () => {
  return {
    title: "Meyclem's",
    description: "Welcome to my pages",
  };
};

const contacts = [
  { title: "github", href: "https://github.com/meyclem" },
  {
    title: "linkedin",
    href: "https://www.linkedin.com/in/clement-meyer-2715b554/",
  },
  { title: "email", href: "mailto:meyclem@gmail.com" },
];

// https://remix.run/guides/routing#index-routes
export default function Index(): JSX.Element {
  return (
    <div className="container mx-auto">
      <div className="flex items-center h-96 justify-center">
        <img
          className="rounded-full w-32 h-32 mr-16"
          src="https://avatars.githubusercontent.com/u/29123047?v=4"
          alt="Clement's picture"
        />
        <div>
          <h1 className="font-bold text-3xl mb-6">
            Hi! I'm <span className="text-pink-400">Clement</span>
          </h1>
          <h2 className="font-semibold text-xl mb-4">Fullstack web developer</h2>
          <div className="flex opacity-50 justify-around">
            {contacts.map((contact) => (
              <a href={contact.href} target="blank" key={contact.title}>
                <img
                  src={`/images/${contact.title}.svg`}
                  className="h-6 w-6 mr-2 last:mr-0"
                  alt={`${contact.title} icon`}
                />
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export { meta };
