import React from "react";
import "./Profile.style.client.css"
import {Link} from "react-router-dom";
import {checkLogin, getUserByUsername} from "../../services/UserServices";
import FavoriteMovieComponent from "./FavoriteMovieComponent";

export default class AnonProfileComponent extends React.Component {
  state = {
    query: '',
    profileUser: {
      username: '',
      password: '',
      email: '',
      phone: '',
      // sections: []
    },
    user: null,
  }

  componentDidMount() {
    checkLogin()
    .catch(e => '')
    .then(user => {
      if(user)
        this.setState({
          user: user
        })
    })

    getUserByUsername(this.props.match.params.username)
      .then(response => this.setState({
        profileUser: response
      }))
  }


  logout = () => {
    fetch("https://cs4550-20su1-proto-server.herokuapp.com/api/logout", {
      method: 'POST',
      credentials: "include"
    })
    .then(response => this.props.history.push("/"))

  }

  render() {
    return (
        <div className='container wbdv-profile-container'>

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


            <h2>Profile</h2>

            <div className='row'>

              <div className='col-4 wbdv-profile-picture-info'>
                <img className='wbdv-profile-pic'
                     src='https://www.jennstrends.com/wp-content/uploads/2013/10/bad-profile-pic-2-768x768.jpeg'/>

                <div className='wbdv-profile-personal-info'>
                  Personal Info
                  <ul>
                    <li>Username: {this.state.profileUser.username}</li>
                    <li>Password: *****</li>
                    <li>Email: {this.state.profileUser.email}</li>
                    <li>Phone: (XXX) XXX-XXXX</li>
                    {/*<li>Date of Birth</li>*/}
                  </ul>

                  {/*<Link to={'/profileEdit'}>*/}
                  {/*  <button>Edit Info</button>*/}
                  {/*</Link>*/}

                </div>

              </div>


              <div className='col-8 wbdv-profile-main-content'>

                <div className='wbdv-profile-favorite-movies'>
                  <h3>Favorite Movies</h3>

                  <div className='row'>
                    {
                      this.state.profileUser && this.state.profileUser.favoriteMovies &&
                      this.state.profileUser.favoriteMovies.map(movie =>
                          <FavoriteMovieComponent key={movie.id}
                                                  movie={movie}/>
                      )
                    }

                  </div>
                </div>

                <div className='wbdv-profile-following'>
                  Following
                </div>

                <div className='wbdv-profile-recent-comments'>
                  Recent Comments
                </div>

              </div>

            </div>


        </div>
    )
  }
}