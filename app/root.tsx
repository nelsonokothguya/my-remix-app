import {
  Links,
  Meta,
  Outlet,
  Scripts,
  Form,
  useActionData,
} from "@remix-run/react";
import { LinksFunction } from "@remix-run/node";
import styles from "../tailwind.css";
import type { ActionFunctionArgs } from "@remix-run/node";
import { getAiAssistant } from "~/openai.mjs";

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const prompt = formData.get("input");
  const response = await getAiAssistant(prompt);
  return response;
}

export const links: LinksFunction = () => [{ rel: "stylesheet", href: styles }];

export default function App() {
  const response = useActionData<typeof action>();
  return (
    // eslint-disable-next-line jsx-a11y/html-has-lang
    <html className="h-full">
      <head>
        <link rel="icon" href="data:image/x-icon;base64,AA" />
        <Meta />
        <Links />
      </head>
      <body className="flex flex-col h-full bg-gray-100">
        <Form method="post" className="m-4">
          <label className="mb-2">
            <span>Add Prompt</span>
            <textarea name="input" className="w-full p-2 border rounded" />
          </label>
          <button
            type="submit"
            className="px-4 py-2 mt-2 text-white bg-blue-500 rounded hover:bg-blue-600"
          >
            Generate with AI
          </button>
        </Form>
        {response && (
          <p className="m-4">
            <strong className="text-blue-600">AI Response:</strong> {response}
          </p>
        )}

        <Outlet />

        <Scripts />
      </body>
    </html>
  );
}
