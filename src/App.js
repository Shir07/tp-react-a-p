import './App.css';
import TaskForm from "./TaskForm";
import Task from "./Task";
import {useEffect, useState} from "react";

function App() {
  const [tasks,setTasks] = useState([]);

  useEffect(() => {
    if (tasks.length === 0) return;
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  useEffect(() => {
    const tasks = JSON.parse(localStorage.getItem('tasks'));
    setTasks(tasks || []);
  }, []);

  //Agregar tarea

  function agregarTask(name) {
    setTasks(prev => {
      return [...prev, {name:name,hecho:false}];
    });
  }

  //Eliminar Tarea

  function eliminarTask(indexEliminar) {
    setTasks(prev => {
      return prev.filter((taskObjt,index) => index !== indexEliminar);
    });
  }

  function actualizarTaskHecho(taskIndex, nuevoHecho) {
    setTasks(prev => {
      const nuevosTasks = [...prev];
      nuevosTasks[taskIndex].done = nuevoHecho;
      return nuevosTasks;
    });
  }

  const numberComplete = tasks.filter(t => t.done).length;
  const numberTotal = tasks.length;

  function getMessage() {
    const percentage = numberComplete/numberTotal * 100;
    if (percentage === 100) {
      return 'Tarea registrada con éxito!';
    }
   
 
  }

  function renombrarTask(index,newName) {
    setTasks(prev => {
      const newTasks = [...prev];
      newTasks[index].name = newName;
      return newTasks;
    })
  }
// Realizados
  return (
    <main>
      <h1>{numberComplete}/{numberTotal} Tareas Realizadas</h1>
      <h2>{getMessage()}</h2>
      <TaskForm onAdd={agregarTask} />
      {tasks.map((task,index) => (
        <Task {...task}
              onRename={newName => renombrarTask(index,newName)}
              onTrash={() => eliminarTask(index)}
              onToggle={done => actualizarTaskHecho(index, done)} />
      ))}
    </main>
  );
}

export default App;
