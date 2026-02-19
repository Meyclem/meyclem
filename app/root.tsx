import type { LinksFunction, MetaFunction } from "@remix-run/node";
import { Links, Meta, Outlet, Scripts, ScrollRestoration, isRouteErrorResponse, useRouteError } from "@remix-run/react";

import stylesheet from "./tailwind.css?url";

const links: LinksFunction = () => [
  { rel: "stylesheet", href: stylesheet },
  { rel: "icon", href: "/favicon.svg" },
];

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
  return [
    { title: "Clement Meyer, Fullstack web developer" },
    { name: "description", content: "Clement Meyer, Fullstack web developer" },
    { property: "og:image", content: "https://www.meyclem.com/meta-image.png" },
    { property: "og:title", content: "Meyclem" },
    { property: "og:url", content: "https://www.meyclem.com" },
  ];
};

function ErrorBoundary(): JSX.Element {
  const error = useRouteError();

  if (isRouteErrorResponse(error)) {
    let message;
    switch (error.status) {
      case 401:
        message = <p>Oops! Looks like you tried to visit a page that you do not have access to.</p>;
        break;
      case 404:
        message = <p>Oops! Looks like you tried to visit a page that does not exist.</p>;
        break;
      default:
        throw new Error(error.data || error.statusText);
    }

    return (
      <Document title={`${error.status} ${error.statusText}`}>
        <Layout>
          <h1>
            {error.status}: {error.statusText}
          </h1>
          {message}
        </Layout>
      </Document>
    );
  }

  if (error instanceof Error) {
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

  return (
    <Document title="Error!">
      <Layout>
        <div>
          <h1>Unknown error</h1>
        </div>
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

export { ErrorBoundary, links, meta };
export default App;
