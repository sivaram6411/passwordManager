import {Component} from 'react'
import {v4 as uuidv4} from 'uuid'
import './App.css'

const initialBackgroundColors = [
  'orange',
  'green',
  'thick-orange',
  'light-green',
  'red',
  'blue',
  'grey',
]

class App extends Component {
  state = {
    website: '',
    userName: '',
    password: '',
    searchInput: '',
    isPasswordCond: false,
    passwordsList: [],
  }

  addNewPassword = event => {
    event.preventDefault()
    const {website, userName, password} = this.state
    const backgroundColorClassName =
      initialBackgroundColors[
        Math.ceil(Math.random() * (initialBackgroundColors.length - 1))
      ]

    const newPasswords = {
      id: uuidv4(),
      website,
      userName,
      password,
      classNameColor: backgroundColorClassName,
    }
    if (website !== '' && userName !== '' && password !== '') {
      this.setState(prevState => ({
        passwordsList: [...prevState.passwordsList, newPasswords],
        website: '',
        userName: '',
        password: '',
      }))
    } else {
      // eslint-disable-next-line
      alert('Please fill details')
    }
  }

  onChangeInputWebsite = event => {
    this.setState({website: event.target.value})
    // console.log(event.target.value)
  }

  onChangeInputUsername = event => {
    this.setState({userName: event.target.value})
    // console.log(event.target.value)
  }

  onChangeInputPassword = event => {
    this.setState({password: event.target.value})
    // console.log(event.target.value)
  }

  onChangeInputSearch = event => {
    this.setState({searchInput: event.target.value})
    // console.log(event.target.value)
  }

  onClickPasswordCheck = () => {
    const {isPasswordCond} = this.state
    this.setState({isPasswordCond: !isPasswordCond})
  }

  onDeleteList = id => {
    const {passwordsList} = this.state
    const RemainingList = passwordsList.filter(eachId => eachId.id !== id)
    this.setState({
      passwordsList: RemainingList,
    })
  }

  getFilterList = () => {
    const {passwordsList, searchInput} = this.state
    const filterPasswordList = passwordsList.filter(eachList =>
      eachList.website.toLowerCase().includes(searchInput.toLowerCase()),
    )

    return filterPasswordList
  }

  render() {
    const {
      website,
      userName,
      password,
      passwordsList,
      searchInput,
      isPasswordCond,
    } = this.state
    const SearchResults = this.getFilterList()

    return (
      <div className="app-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/password-manager-logo-img.png"
          alt="app logo"
          className="logo-image"
        />
        <div className="add-passwords-container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/password-manager-sm-img.png"
            alt="password manager"
            className="password-manager-image-sm"
          />
          <div className="form-input-container">
            <h1 className="add-password-heading">Add New Password</h1>
            <form className="form-container" onSubmit={this.addNewPassword}>
              <div className="input-container">
                <img
                  src="https://assets.ccbp.in/frontend/react-js/password-manager-website-img.png"
                  alt="website"
                  className="input-image"
                />
                <input
                  type="text"
                  placeholder="Enter Website"
                  className="input"
                  onChange={this.onChangeInputWebsite}
                  value={website}
                />
              </div>
              <div className="input-container">
                <img
                  src="https://assets.ccbp.in/frontend/react-js/password-manager-username-img.png"
                  alt="username"
                  className="input-image"
                />
                <input
                  type="text"
                  placeholder="Enter Username"
                  className="input"
                  onChange={this.onChangeInputUsername}
                  value={userName}
                />
              </div>
              <div className="input-container">
                <img
                  src="https://assets.ccbp.in/frontend/react-js/password-manager-password-img.png"
                  alt="password"
                  className="input-image"
                />
                <input
                  type="password"
                  placeholder="Enter Password"
                  className="input"
                  onChange={this.onChangeInputPassword}
                  value={password}
                />
              </div>
              <button type="submit" className="add-btn">
                Add
              </button>
            </form>
          </div>
          <img
            src="https://assets.ccbp.in/frontend/react-js/password-manager-lg-img.png"
            alt="password manager"
            className="password-manager-image-lg"
          />
        </div>
        <div className="your-passwords-container">
          <div className="password-search-container">
            <div className="password-length">
              <h1 className="your-passwords-text">Your Passwords</h1>
              <p className="span">{passwordsList.length}</p>
            </div>
            <div className="search-container">
              <img
                src="https://assets.ccbp.in/frontend/react-js/password-manager-search-img.png"
                alt="search"
                className="search-image"
              />
              <input
                type="search"
                placeholder="Search"
                className="input-search"
                onChange={this.onChangeInputSearch}
                value={searchInput}
              />
            </div>
          </div>
          <hr className="hr-line" />
          <div className="check-box-container">
            <input
              type="checkbox"
              className="check-box"
              onClick={this.onClickPasswordCheck}
              id="check"
            />
            <label htmlFor="check">Show Passwords</label>
          </div>
          {SearchResults.length > 0 ? (
            <ul className="list-order">
              {SearchResults.map(eachItem => (
                <li className="list-container" key={eachItem.id}>
                  <div className="initial-password-container">
                    <div
                      className={`initial-container ${eachItem.classNameColor}`}
                    >
                      <p>{eachItem.website[0].toUpperCase()}</p>
                    </div>
                    <div className="details-container">
                      <p className="gmail">{eachItem.website}</p>
                      <p className="name">{eachItem.userName}</p>
                      {isPasswordCond ? (
                        <p className="star">{eachItem.password}</p>
                      ) : (
                        <p className="star">
                          <img
                            src="https://assets.ccbp.in/frontend/react-js/password-manager-stars-img.png"
                            alt="stars"
                            className="stars"
                          />
                        </p>
                      )}
                    </div>
                  </div>
                  <button
                    type="button"
                    className="dlt-button"
                    onClick={() => this.onDeleteList(eachItem.id)}
                    data-testid="delete"
                  >
                    <img
                      src="https://assets.ccbp.in/frontend/react-js/password-manager-delete-img.png"
                      alt="delete"
                      className="delete"
                    />
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <div className="no-passwords-container">
              <img
                src="https://assets.ccbp.in/frontend/react-js/no-passwords-img.png"
                alt="no passwords"
                className="no-passwords-image"
              />
              <p className="no-passwords-text">No Passwords</p>
            </div>
          )}
        </div>
      </div>
    )
  }
}

export default App
