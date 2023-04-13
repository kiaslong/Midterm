import { useState } from 'react';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonPage,
  IonInput,
  IonButton,
  IonList,
  IonItem,
  IonCheckbox,
  IonLabel,
  IonTextarea,
  IonCard,
  IonCol,
  IonRow,
  IonGrid,
  IonCardContent,
  IonCardTitle,
  IonCardHeader,
  IonCardSubtitle,
  IonIcon,
  IonDatetime,
  IonToggle,
  IonModal
} from '@ionic/react';
import { InputChangeEventDetail } from '@ionic/core';
import {pin,trashBin,settings} from 'ionicons/icons';
import './Home.css';
import React from 'react';

interface Todo {
  id: number;

  title: string;
  content: string;
  pinned: boolean;
  date: string;
}

const Home: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [title, setTitle] = useState<string>('');
  const [content, setContent] = useState<string>('');
  
 
   const [date, setDate] = useState<string>('');
   const [Id, setSelectedID] = useState<number>(1);
// open modal
  function handleOpenEditModal(id:number, title:string,content:string,date:string) {
    setSelectedID(id);
      setTitle(title);
      setContent(content);
      setDate(date);

    setIsEditModalOpen(true);
  }

// close modal
  function handleCloseEditModal() {
    setIsEditModalOpen(false);
  }
  // handle input for content
  const handleContentChange = (event: CustomEvent<InputChangeEventDetail>) => {
    const value = event.detail.value as string;
    setContent(value);
  };
  // handle input for title
  const handleTitleChange = (event: CustomEvent<InputChangeEventDetail>) => {
    const value = event.detail.value as string;
    setTitle(value);
  };

// handle input for date
  const handleDateChange = (event: CustomEvent<InputChangeEventDetail>) => {
    const value = event.detail.value as string;
    setDate(value);
  };

//hande edit event 
  function handleEditTodo(id: number) {
    
 
  
    const updatedTodos = todos.map((todo) => {
      if (todo.id === id) {
        return {
          ...todo,
          title: title,
          content: content,
          date: date,
        };
      } else {
        return todo;
      }
    });
    setTodos(updatedTodos);
    setTitle('');
      setContent('');
      setDate('');
    
    
   handleCloseEditModal()
  }

  
//handle add todos
  function handleAddTodo() {
    if (date !== '') {
      const todo = {
        id: todos.length + 1,
       
        title: title,
        content: content,
        pinned: false,
        date: date,
      };
      setTodos([...todos, todo]);
      setTitle('');
      setContent('');
      setDate('');
    
    }
  }
  
//handle delete todos 
  function handleDeleteTodo(id: number) {
    const updatedTodos = todos.filter((todo) => todo.id !== id);
    setTodos(updatedTodos);
  }

  //handle Pin todos 
  function handlePinTodo(id: number) {
    const updatedTodos = todos.map((todo) => {
      if (todo.id === id) {
        return {
          ...todo,
          pinned: !todo.pinned
        };
      } else {
        return todo;
      }
    });
    setTodos(updatedTodos);
  }

  const pinnedTodos = todos.filter((todo) => todo.pinned);
  const unpinnedTodos = todos.filter((todo) => !todo.pinned);

  return (
  <IonPage>
  <IonHeader className="Hbar">
    <IonToolbar className="bar">
      <IonTitle>Todo List</IonTitle>
    </IonToolbar>
  </IonHeader>
  <IonContent fullscreen>
  <IonModal isOpen={isEditModalOpen} onDidDismiss={handleCloseEditModal}>
        <IonHeader>
          <IonToolbar>
            <IonTitle>Edit Todo</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent>
          <form className="todo-form" >
      <IonList>
        <IonItem >
          <IonLabel position="floating">Title</IonLabel>
          <IonInput type="text" placeholder="Enter title" value={title}  onIonChange={handleTitleChange} />
        </IonItem>
        <IonItem>
          <IonLabel position="floating">Content</IonLabel>
          <IonTextarea placeholder="Enter content" value={content} onIonChange={handleContentChange} />
        </IonItem>
        <IonItem>
          <IonLabel position="floating"> Date </IonLabel>
          <IonInput type="date" placeholder="pick date" value={date} onIonChange={handleDateChange} />        
        </IonItem>
        <IonButton expand="block" onClick={()=>handleEditTodo(Id)}>
           Edit
          </IonButton>
      </IonList>
    </form>
        </IonContent>
      </IonModal>
    <IonHeader collapse="condense">
      <IonToolbar>
        <IonTitle size="large">Todo List</IonTitle>
      </IonToolbar>
    </IonHeader>
    <form className="todo-form">
      <IonList>
        <IonItem>
          <IonLabel position="floating">Title</IonLabel>
          <IonInput type="text" placeholder="Enter title" value={title} onIonChange={handleTitleChange} />
        </IonItem>
        <IonItem>
          <IonLabel position="floating">Content</IonLabel>
          <IonTextarea placeholder="Enter content" value={content} onIonChange={handleContentChange} />
        </IonItem>
        <IonItem>
          <IonLabel position="floating"> Date </IonLabel>
          <IonInput type="date" placeholder="pick date" value={date} onIonChange={handleDateChange} />        
        </IonItem>
        <IonButton expand="block" onClick={handleAddTodo}>
            Add Todo
          </IonButton>
      </IonList>
    </form>

    <IonGrid>
  {pinnedTodos.length > 0 && (
    <IonRow>
      <IonCol>
        <IonCard  color="dark">
          <IonCardHeader>
            <IonCardSubtitle>Priority Task</IonCardSubtitle>
          </IonCardHeader>
          <IonCardContent>
            {pinnedTodos.map((todo) => (
              <IonItem key={todo.id}>
                <IonIcon icon={pin} slot="start" color="danger" />
                <IonToggle slot="start" checked={todo.pinned} onIonChange={() => handlePinTodo(todo.id)} />
                <IonLabel>
                  <h2>{todo.title}</h2>
                  <p>{todo.content}</p>
                  <p>{todo.date}</p>
                </IonLabel>
                <IonButton fill="clear" onClick={() => handleDeleteTodo(todo.id)}>
                <IonIcon icon={trashBin} slot="start" color="danger" />
                  Delete
                </IonButton>  
                <IonButton fill="clear" onClick={() =>  handleOpenEditModal(todo.id,todo.title,todo.content,todo.date)}>
                  <IonIcon icon={settings} slot="start" color="danger" />
                  edit
                </IonButton>               
              </IonItem>
            ))}
          </IonCardContent>
        </IonCard>
      </IonCol>
    </IonRow>
  )}

  <IonRow>
    <IonCol>
      <IonCard color="tertiary">
        <IonCardHeader>
          <IonCardSubtitle>All Unpriority Tasks</IonCardSubtitle>
        </IonCardHeader>
        <IonCardContent color="dark">
          {unpinnedTodos.map((todo) => (
            <IonItem color="dark" key={todo.id} >
              
              <IonToggle  slot="start" checked={todo.pinned} onIonChange={() => handlePinTodo(todo.id)} />
              <IonLabel>
                <h2>{todo.title}</h2>
                <p>{todo.content}</p>
                <p>{todo.date}</p>
              </IonLabel>
              <IonButton fill="clear" onClick={() => handleDeleteTodo(todo.id)}>
              <IonIcon icon={trashBin} slot="start" color="danger" />
                Delete
              </IonButton>
              <IonButton fill="clear" onClick={() => handleOpenEditModal(todo.id,todo.title,todo.content,todo.date)}>
                  <IonIcon icon={settings} slot="start" color="danger" />
                  edit
                </IonButton> 
            </IonItem>
          ))}
        </IonCardContent>
      </IonCard>
    </IonCol>
  </IonRow>
</IonGrid>
  </IonContent>
</IonPage>

  );
};

export default Home;


