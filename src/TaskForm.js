import {useState} from "react";

//form
export default function TaskForm({onAdd}) {
  const [taskName,setTaskName] = useState('');
  function handleSubmit(ev) {
    ev.preventDefault();
    onAdd(taskName);
    setTaskName('');
  }

  //boton para adherir
  return (
    <form onSubmit={handleSubmit}>
    
      <button>+</button>
      <input type="text"
             value={taskName}
             onChange={ev => setTaskName(ev.target.value)}
             placeholder="¿Cuál es tu próxima tarea?"/>
    </form>
  );
}