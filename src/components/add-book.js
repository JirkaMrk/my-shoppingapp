
class AddBook extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      books: [
        { id: 1, title: "The Great Gatsby", author: "F. Scott Fitzgerald", checked: false },
        { id: 2, title: "To Kill a Mockingbird", author: "Harper Lee", checked: false },
        { id: 3, title: "1984", author: "George Orwell", checked: false },
        { id: 4, title: "Pride and Prejudice", author: "Jane Austen", checked: false },
        { id: 5, title: "The Catcher in the Rye", author: "J.D. Salinger", checked: false }
      ],
      showUncheckedOnly: false
    };
  }

  handleCheckboxChange = () => {
    this.setState(prevState => ({
      showUncheckedOnly: !prevState.showUncheckedOnly
    }));
  }

  render() {
    const { books, showUncheckedOnly } = this.state;
    const filteredBooks = showUncheckedOnly ? books.filter(book => !book.checked) : books;

    return (
      <div>
        <label>
          <input type="checkbox" checked={showUncheckedOnly} onChange={this.handleCheckboxChange} />
          Show unchecked only
        </label>
        <table>
          <thead>
            <tr>
              <th>Title</th>
              <th>Author</th>
              <th>Checked</th>
            </tr>
          </thead>
          <tbody>
            {filteredBooks.map(book => (
              <tr key={book.id}>
                <td>{book.title}</td>
                <td>{book.author}</td>
                <td><input type="checkbox" checked={book.checked} /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}
