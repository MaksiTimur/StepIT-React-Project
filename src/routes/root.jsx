import { Outlet, NavLink, useNavigation, useLoaderData, Form, redirect, useSubmit } from "react-router-dom";
import { getTasks, createTask } from "../tasks";
import { useEffect } from "react";

export async function action() {
  const task = await createTask();
  return redirect(`/tasks/${task.id}/edit`);
}

export async function loader({ request }) {
  const url = new URL(request.url);

  const q = url.searchParams.get("q");
  const tasks = await getTasks(q);

  return { tasks, q };
}

export default function Root() {
  const { tasks, q } = useLoaderData();
  const navigation = useNavigation();
  const submit = useSubmit();

  const searching =
    navigation.location &&
    new URLSearchParams(navigation.location.search).has(
      "q"
    );

  useEffect(() => {
    document.getElementById("q").value = q;
  }, [q]);

  return (
    <>
      <div id="sidebar">
        <h1>React Router Tasks</h1>
        <div>
          <Form id="search-form" role="search">
            <input
              id="q"
              className={searching ? "loading" : ""}
              aria-label="Search tasks"
              placeholder="Search"
              type="search"
              name="q"
              defaultValue={q}
              onChange={(event) => {
                const isFirstSearch = q == null;
                submit(event.currentTarget.form, {
                  replace: !isFirstSearch,
                });
              }}
            />
            <div
              id="search-spinner"
              aria-hidden
              hidden={!searching}
            />
            <div
              className="sr-only"
              aria-live="polite"
            ></div>
          </Form >
          <Form method="post">
            <button type="submit">New</button>
          </Form>
        </div>
        <nav>
          {tasks.length ? (
            <ul>
              {tasks.map((task) => (
                <li key={task.id}>
                  <NavLink
                    to={`tasks/${task.id}`}
                    className={({ isActive, isPending }) =>
                      isActive
                        ? "active"
                        : isPending
                          ? "pending"
                          : ""
                    }
                  >
                    {task.first || task.last ? (
                      <>
                        {task.first} {task.last}
                      </>
                    ) : (
                      <i>No Name</i>
                    )}
                    {" "}
                    {task.favorite && <span>★</span>}
                  </NavLink>
                </li>
              ))}
            </ul>
          ) : (
            <p>
              <i>No tasks</i>
            </p>
          )}
        </nav>
      </div>
      <div
        id="detail"
        className={
          navigation.state === "loading" ? "loading" : ""
        }
      >
        <Outlet />
      </div>
    </>
  );
}