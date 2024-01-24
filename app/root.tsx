import {
  Links,
  Meta,
  Outlet,
  Scripts,
  Form,
  useActionData,
} from "@remix-run/react";
import type { ActionFunctionArgs } from "@remix-run/node";
import { getAiAssistant } from "~/openai.mjs";

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const prompt = formData.get("input");
  const response = await getAiAssistant(prompt);
  return response;
}

export default function App() {
  const response = useActionData<typeof action>();
  return (
    // eslint-disable-next-line jsx-a11y/html-has-lang
    <html>
      <head>
        <link rel="icon" href="data:image/x-icon;base64,AA" />
        <Meta />
        <Links />
      </head>
      <body>
        <Form method="post">
          <label>
            <span>Add Prompt</span>
            <textarea name="input" />
          </label>
          <button type="submit">Generate with AI</button>
        </Form>
        {response && (
          <p>
            <strong>AI Response:</strong> {response}
          </p>
        )}

        <Outlet />

        <Scripts />
      </body>
    </html>
  );
}
