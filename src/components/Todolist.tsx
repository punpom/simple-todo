import { FunctionComponent, useState } from "react"

interface Task {
    id: number,
    text: string,
    completed: boolean,
}

const Todolist: FunctionComponent = () => {
    const [task, setTask] = useState<Task[]>([]);
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

    const completeTask = (taskId : number) => {
        setTask(() => task.map(task => {
            if (task.id === taskId) {
                return {...task, completed: !task.completed}
            }
            return task;
        }))

    }

    return (
        <>
        <div><ul>{task.map((task) => 
            <li key={task.id}>{task.text}  <button onClick={() => deleteTask(task.id)}>Delete</button> <input type="checkbox" onChange={() => completeTask(task.id)}></input> </li>)}
            </ul>
            <input type="text" placeholder="New task" value={newTask} onChange={(e) => setNewTask(() => e.target.value)}></input>
            <button onClick={() => addTask(newTask)}>Submit</button>
        </div>
        </>
    )
}

export default Todolist;