import { Links, LiveReload, Meta, MetaFunction, Outlet, Scripts, ScrollRestoration, useCatch } from "remix";

import styles from "./tailwind.css";

function links(): { rel: string; href: string }[] {
  return [
    { rel: "stylesheet", href: styles },
    { rel: "icon", href: "/favicon.svg" },
  ];
}

function App(): JSX.Element {
  return (
    <Document>
      <Layout>
        <Outlet />
      </Layout>
    </Document>
  );
}

const meta: MetaFunction = () => {
  return {
    title: "Clement Meyer, Fullstack web developer",
    description: "Delicious shakes",
    "og:image": "https://www.meyclem.com/meta-image.png",
    "og:title": "Meyclem",
    "og:url": "https://www.meyclem.com",
  };
};

// https://remix.run/docs/en/v1/api/conventions#errorboundary
function ErrorBoundary({ error }: { error: Error }): JSX.Element {
  console.error(error);
  return (
    <Document title="Error!">
      <Layout>
        <div>
          <h1>There was an error</h1>
          <p>{error.message}</p>
          <hr />
          <p>Hey, developer, you should replace this with what you want your users to see.</p>
        </div>
      </Layout>
    </Document>
  );
}

// https://remix.run/docs/en/v1/api/conventions#catchboundary
function CatchBoundary(): JSX.Element {
  const caught = useCatch();

  let message;
  switch (caught.status) {
    case 401:
      message = <p>Oops! Looks like you tried to visit a page that you do not have access to.</p>;
      break;
    case 404:
      message = <p>Oops! Looks like you tried to visit a page that does not exist.</p>;
      break;

    default:
      throw new Error(caught.data || caught.statusText);
  }

  return (
    <Document title={`${caught.status} ${caught.statusText}`}>
      <Layout>
        <h1>
          {caught.status}: {caught.statusText}
        </h1>
        {message}
      </Layout>
    </Document>
  );
}

function Document({ children, title }: { children: React.ReactNode; title?: string }): JSX.Element {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        {title ? <title>{title}</title> : null}
        <Meta />
        <Links />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
        {process.env.NODE_ENV === "development" && <LiveReload />}
      </body>
    </html>
  );
}

function Layout({ children }: { children: React.ReactNode }): JSX.Element {
  return (
    <div>
      <main className="selection:bg-cyan-400">{children}</main>
    </div>
  );
}

export { CatchBoundary, ErrorBoundary, links, meta };
export default App;
