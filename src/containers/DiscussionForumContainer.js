import React from "react";
import "../components/forum/Forum.style.client.css"
import {
  createForum,
  deleteForum,
  getAllForums
} from "../services/ForumServices";
import {Link} from "react-router-dom";
import {checkLogin} from "../services/UserServices";

export default class DiscussionForumContainer extends React.Component {
  state = {
    forums: null,
  }

  componentDidMount() {
    getAllForums()
      .then(forums => this.setState({forums: forums}))

    checkLogin()
    .catch(e => '')
    .then(user => {
      if(user)
        this.setState({
          user: user
        })
    })
  }

  addForum = (forum) => {
    createForum(forum)
      .then(newForum => this.setState(prevState => ({
        forums: [...prevState.forums, newForum]
      })))
  }


  deleteForum = (forumToDelete) => {
    deleteForum(forumToDelete.id)
      .then(status => this.setState(prevState => ({
        forums: prevState.forums.filter(forum =>
            forum !== forumToDelete
        )
      })))
  }

  logout = () => {
    fetch("http://localhost:8080/api/logout", {
      method: 'POST',
      credentials: "include"
    })
    .then(response => this.props.history.push("/"))

  }

  render() {
    return (
        <div className='container wbdv-forum-list-container'>

          {
            this.state.user &&
            <nav className="navbar fixed-top navbar-light bg-light">

              <Link to={"/"} className="navbar-brand">
                What Movie Should I Watch Next?
              </Link>


              <div className='wbdv-search-field-and-btn'>
                <input  className="wbdv-nav-search-field form-control mr-sm-2"
                        type="search"
                        placeholder="Search For a Movie Title"
                        aria-label="Search"
                        title="Search for a movie here"
                        value={this.state.query}
                        onChange={(event) => this.setState({
                          query: event.target.value
                        })}/>
                <Link to={`/search/${this.state.query}`}>
                  <button className="btn btn-danger my-2 my-sm-0"
                          type="submit">
                    Search
                    {/*<i className="fa fa-plus"/>*/}
                  </button>
                </Link>

              </div>

              <div>
                <ul className='navbar-nav wbdv-nav-login-signup'>
                  <li className='wbdv-nav-signup nav-item'>
                    <Link to={'/profile'}>
                      <button className='btn btn-outline-success'>
                        My profile
                      </button>
                    </Link>
                  </li>

                  <li className='nav-item'>
                    <button onClick={this.logout}
                            className='btn btn-danger'>
                      Log out
                    </button>
                  </li>

                </ul>
              </div>
            </nav>
          }

          {
            !this.state.user &&
            <nav className="navbar fixed-top navbar-light bg-light">

              <Link to={"/"} className="navbar-brand">
                What Movie Should I Watch Next?
              </Link>

              <div className='wbdv-search-field-and-btn'>
                <input  className="wbdv-nav-search-field form-control mr-sm-2"
                        type="search"
                        placeholder="Search For a Movie Title"
                        aria-label="Search"
                        title="Search for a movie here"
                        value={this.state.query}
                        onChange={(event) => this.setState({
                          query: event.target.value
                        })}/>
                <Link to={`/search/${this.state.query}`}>
                  <button className="btn btn-danger my-2 my-sm-0"
                          type="submit">
                    Search
                    {/*<i className="fa fa-plus"/>*/}
                  </button>
                </Link>

              </div>

              <div>
                <ul className='navbar-nav wbdv-nav-login-signup'>
                  <li className='wbdv-nav-signup nav-item'>
                    <Link to={'/register'}>
                      <button className='btn btn-outline-success'>
                        Sign up
                      </button>
                    </Link>
                  </li>

                  <li className='nav-item'>
                    <Link to={'/login'}>
                      <button className='btn btn-warning'>
                        Log in
                      </button>
                    </Link>
                  </li>

                </ul>
              </div>
            </nav>
          }


          <h2>Discussion Forum</h2>

          <div>
            <ul className='list-group'>

            {
              // console.log(this.state.forums)
              this.state.forums &&
              this.state.forums.map(forum =>
                    <li className='list-group-item'>
                      <Link to={`/forums/${forum.id}`}>
                        {forum.title}
                      </Link>

                      <button className=''
                              onClick={() => this.deleteForum(forum)}>Delete</button>
                    </li>


              )

            }
            </ul>

            <button onClick={() => this.addForum({
              title: "New Forum",
              text: "Forum text here",
            })}>
              Add forum
            </button>
          </div>

        </div>

    )
  }
}