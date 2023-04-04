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
  IonIcon
} from '@ionic/react';
import { InputChangeEventDetail } from '@ionic/core';
import { key, pin } from 'ionicons/icons';
import './Home.css';

interface Todo {
  id: number;
  text: string;
  title: string;
  content: string;
  pinned: boolean;
}

const Home: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newsothutu, setNewsothutu] = useState<string>('');
  const [title, setTitle] = useState<string>('');
  const [content, setContent] = useState<string>('');

  const handleContentChange = (event: CustomEvent<InputChangeEventDetail>) => {
    const value = event.detail.value as string;
    setContent(value);
  };
  const handleTitleChange = (event: CustomEvent<InputChangeEventDetail>) => {
    const value = event.detail.value as string;
    setTitle(value);
  };

  const handleNewTodoChange = (event: CustomEvent<InputChangeEventDetail>) => {
    const value = event.detail.value as string;
    setNewsothutu(value);
  };

  function handleAddTodo() {
    if (newsothutu !== '') {
      const todo = {
        id: todos.length + 1,
        text: newsothutu,
        title: title,
        content: content,
        pinned: false
      };
      setTodos([...todos, todo]);
      setNewsothutu('');
      setTitle('');
      setContent('');
    }
  }

  function handleDeleteTodo(id: number) {
    const updatedTodos = todos.filter((todo) => todo.id !== id);
    setTodos(updatedTodos);
  }

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
  <IonHeader>
    <IonToolbar color="primary">
      <IonTitle>Todo List</IonTitle>
    </IonToolbar>
  </IonHeader>
  <IonContent fullscreen>
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
          <IonLabel position="floating">New Todo</IonLabel>
          <IonInput type="text" placeholder="Enter todo" value={newsothutu} onIonChange={handleNewTodoChange} />
          <IonButton expand="block" onClick={handleAddTodo}>
            Add Todo
          </IonButton>
        </IonItem>
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
                <IonCheckbox slot="start" checked={todo.pinned} onIonChange={() => handlePinTodo(todo.id)} />
                <IonLabel>
                  <h2>{todo.title}</h2>
                  <p>{todo.content}</p>
                  <p>{todo.text}</p>
                </IonLabel>
                <IonButton fill="clear" onClick={() => handleDeleteTodo(todo.id)}>
                  <IonIcon icon={pin} slot="start" color="danger" />
                  Delete
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
            <IonItem color="dark" key={todo.id}>
              <IonCheckbox slot="start" checked={todo.pinned} onIonChange={() => handlePinTodo(todo.id)} />
              <IonLabel>
                <h2>{todo.title}</h2>
                <p>{todo.content}</p>
                <p>{todo.text}</p>
              </IonLabel>
              <IonButton fill="clear" onClick={() => handleDeleteTodo(todo.id)}>
                <IonIcon icon={pin} slot="start" color="danger" />
                Delete
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


