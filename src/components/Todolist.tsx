import { FunctionComponent, useState } from "react"

interface Task {
    id: number,
    text: string,
    completed: boolean,
}

const Todolist: FunctionComponent = () => {
    const [task, setTask] = useState<Task[]>([]);
    const [completedTask, setCompletedTask] = useState<Task[]>([]);
    const [newTask, setNewTask] = useState<string>("");

    const addTask = (newTask: string) => {
        setTask((prevTask) => {
            const lastId = prevTask.length - 1;
            return [...prevTask, {
            id: lastId + 1,
            text: newTask,
            completed: false
          }]
        })
        setNewTask('');
    }

    const deleteTask = (taskId : number) => {
        setTask(() => task.filter(task => task.id != taskId));
    }

    const completeTask = (completedTask: Task) => {
        setTask(() => task.filter(task => task.id != completedTask.id))
        setCompletedTask((prevCompletedTask) => {
            const lastId = prevCompletedTask.length - 1;
            return [...prevCompletedTask, {
                id: lastId + 1,
                text: completedTask.text,
                completed: true
            }]
        })
    }

    console.log(task);

    return (
        <>
        <div><ul>{task.map((task) => 
            <li key={task.id}>{task.text}  <button onClick={() => deleteTask(task.id)}>Delete</button> <button onClick={() => completeTask(task)}>Complete</button></li>)}
            </ul>
            <input type="text" placeholder="New task" value={newTask} onChange={(e) => setNewTask(() => e.target.value)}></input>
            <button onClick={() => addTask(newTask)}>Submit</button>
        </div>
        <div>
            <h1>Completed</h1>
            <ul>
                {completedTask.map((task) => 
                <li key={task.id}>{task.text}</li>
                )}
            </ul>
        </div>
        </>
    )
}

export default Todolist;