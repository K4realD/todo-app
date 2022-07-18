import './SetTodo.css'

function SetTodo ({input, handleSearch, handleOpenPopup}) {
    return(
        <section className="new-todo">
        <input
          type="text"
          name="search"
          placeholder="Поиск..."
          className="search"
          id="search-input"
          value={input}
          onChange={handleSearch}
        ></input>
        <button
          type="button"
          aria-label="Add"
          className="new-todo__add-btn"
          onClick={handleOpenPopup}
        ></button>
      </section>
    )
}

export default SetTodo