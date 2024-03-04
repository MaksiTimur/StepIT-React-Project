import { Outlet, NavLink, useNavigation, useLoaderData, Form, redirect, useSubmit } from "react-router-dom";
import { getTasks, createTask, updateTask } from "../tasks";
import { useEffect } from "react";
import Filters from "../components/Filter/Filters";

let filter = null;

export async function action() {
  const task = await createTask();

  return redirect(`/tasks/${task.id}/edit`);
}

export async function loader({ request }) {
  const url = new URL(request.url);

  const q = url.searchParams.get("q");
  const tasks = await getTasks(q, filter);

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
        <Filters handleClick={(filterType) => {
          filter = filterType;
        }} arr={tasks} />
        <nav>
          {tasks.length ? (
            <ul>
              {tasks.map((task) => (
                <li key={task.id} id={task.id}>
                  {
                    <Form method="post">
                      <input
                        onChange={e => {
                          updateTask(task.id, { checked: e.target.checked });
                        }}
                        type="checkbox"
                        name="checked"
                        defaultChecked={task.checked}
                        aria-label={
                          task.checked
                            ? "Remove from completed"
                            : "Add to completed"
                        }>
                      </input>
                    </Form>
                  }
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
                    {task.name ? (
                      <>
                        {task.name}
                      </>
                    ) : (
                      <i>No Name</i>
                    )}
                  </NavLink>
                  <div className="buttons">

                    <Form action={`tasks/${task.id}/edit`}>
                      <button type="submit">Edit</button>
                    </Form>

                    <Form
                      method="post"
                      action={`tasks/${task.id}/destroy`}
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