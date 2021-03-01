import React, {useState, useEffect} from 'react';
import axios from 'axios';
import ToDoItems from '../to-do-items/to-do-items';
import Pagination from '../pagination/pagination';
import './app.css';

const App = () => {
  //запрос в API
  useEffect(() => {
    const fetchToDoItems = async () => {
      setLoading(true);
      const response = await axios.get('https://jsonplaceholder.typicode.com/todos');
      setToDoItems(response.data);
      setRenderToDoItems(response.data);
      setLoading(false);
    }
    fetchToDoItems();
  }, []);

  // здесь хранятся данные из API
  const [toDoItems, setToDoItems] = useState([]);
  const [renderToDoItems, setRenderToDoItems] = useState([]);
  // здесь хранится состояние данных - загружены или не загружены из API
  const [isLoading, setLoading] = useState(false);
  // здесь хранится тек. страница
  const [currentPage, setCurrentPage] = useState(1);
  //здесь хранятся настройки пагинации
  const [toDoItemsPerPage] = useState(50);

  //Настройка сортировки
  const [isNumberTitleClick, setNumberTitleClick] = useState(false);
  const [isTitleTableClick, setTitleTableClick] = useState(false);
  const [isStatusTableClick, setStatusTableClick] = useState(false);

  const onTableClick = (evt) => {
    switch (evt.target.dataset.name) {
      case `number`:
        isNumberTitleClick ?
          setRenderToDoItems(renderToDoItems.slice(0).sort((item1, item2) => item1.id > item2.id ? -1 : 1)) :
          setRenderToDoItems(renderToDoItems.slice(0).sort((item1, item2) => item1.id > item2.id ? 1 : -1));
        break;
      case `title`:
        isTitleTableClick ?
          setRenderToDoItems(renderToDoItems.slice(0).sort((item1, item2) => item1.title > item2.title ? -1 : 1)) :
          setRenderToDoItems(renderToDoItems.slice(0).sort((item1, item2) => item1.title > item2.title ? 1 : -1));
        break;
      case `status`:
        isStatusTableClick ?
          setRenderToDoItems(renderToDoItems.slice(0).sort((item1, item2) => item1.completed > item2.completed ? -1 : 1)) :
          setRenderToDoItems(renderToDoItems.slice(0).sort((item1, item2) => item1.completed > item2.completed ? 1 : -1));
        break;
      default:
        return false;
    }
    isNumberTitleClick ? setNumberTitleClick(false) : setNumberTitleClick(true);
    isTitleTableClick ? setTitleTableClick(false) : setTitleTableClick(true);
    isStatusTableClick ? setStatusTableClick(false) : setStatusTableClick(true);

  };

  const onInputForm = (evt) => {
    evt.preventDefault();
    if (evt.target.value) {
      let filteredToDoItems = toDoItems.slice(0).filter((item) => item.title.indexOf(evt.target.value) !== -1);
      setRenderToDoItems(filteredToDoItems);
    }
    if (evt.target.value === ``) {
      setRenderToDoItems(toDoItems);
    }
  }

  //меняем страницу
  const onPaginationLinkClick = (evt) => {
    evt.preventDefault();
    setCurrentPage(+evt.target.textContent);
  }

  // список дел для вывода на страницу
  const indexOfLastToDoItems = currentPage * toDoItemsPerPage;
  const indexOfFirstToDoItems = indexOfLastToDoItems - toDoItemsPerPage;
  const currentToDoItems = renderToDoItems.slice(indexOfFirstToDoItems, indexOfLastToDoItems);

  return (
    <div>
      <h1 className="title">Список дел</h1>
      <form className="form" onInput={onInputForm}>
        <label className="form__label" htmlFor="search">Поиск по заголовку:</label>
        <input type="text" name="search" id="search" />
      </form>
      <ToDoItems toDoItems={currentToDoItems} isLoading={isLoading} onTableClick={onTableClick} />
      <Pagination
        toDoItemsPerPage={toDoItemsPerPage}
        totalToDoItem={renderToDoItems.length}
        onPaginationLinkClick={onPaginationLinkClick}
        currentPage={currentPage}
      />
    </ div>
  );
}

export default App;
