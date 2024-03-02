import { Form, useLoaderData, useFetcher } from "react-router-dom";
import { getTask, updateTask } from "../tasks";

export async function action({ request, params }) {
  let formData = await request.formData();

  return updateTask(params.taskId, {
    checked: formData.get("checked") === "true",
  });
}

export async function loader({ params }) {
  const task = await getTask(params.taskId);

  if (!task) {
    throw new Response("", {
      status: 404,
      statusText: "Not Found",
    });
  }

  return { task };
}

export default function Task() {
  const { task } = useLoaderData();

  return (
    <div id="task">
      <div>
        <h1>
          {task.name ? (
            <>
              {task.name}
            </>
          ) : (
            <i>No Name</i>
          )}{" "}
          <Checked task={task} />
        </h1>

        {task.description && <p>{task.description}</p>}

        <div>
          <Form action="edit">
            <button type="submit">Edit</button>
          </Form>
          <Form
            method="post"
            action="destroy"
            onSubmit={(event) => {
              if (
                !window.confirm(
                  "Please confirm you want to delete this record."
                )
              ) {
                event.preventDefault();
              }
            }}
          >
            <button type="submit">Delete</button>
          </Form>
        </div>
      </div>
    </div>
  );
}

function Checked({ task }) {
  const fetcher = useFetcher();
  let checked = task.checked;

  if (fetcher.formData) {
    checked = fetcher.formData.get("checked") === "true";
  }

  return (
    <fetcher.Form method="post">
      <button
        name="checked"
        value={checked ? "false" : "true"}
        aria-label={
          checked
            ? "Remove from checked"
            : "Add to checked"
        }
      >
        {checked ? "☑" : "☐"}
      </button>
    </fetcher.Form>
  );
}