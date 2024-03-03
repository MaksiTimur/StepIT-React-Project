import { useLoaderData } from "react-router-dom";
import { getTask } from "../tasks";

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
          )}
        </h1>

        {task.description && <p>{task.description}</p>}
      </div>
    </div>
  );
}