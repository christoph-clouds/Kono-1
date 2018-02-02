import { slide as Menu } from 'react-burger-menu'
import { Link } from 'react-router-dom'
}
 
class Example extends React.Component {
    constructor (props) {
    super(props);
    this.state = {
      hidden: false
    };
  }

  componentWillReceiveProps(nextProps) {
    const sideChanged = this.props.children.props.right !== nextProps.children.props.right;

    if (sideChanged) {
      this.setState({hidden : true});

      setTimeout(() => {
        this.show();
      }, this.props.wait);
    }
  }

  show() {
    this.setState({hidden : false});
  }

  render() {
    let style;

    if (this.state.hidden) {
      style = {display: 'none'};
    }

    return (
      <div style={style} className={this.props.side}>
        {this.props.children}
      </div>
    );
  }
}
 
  render () {
    return (
      <Menu pageWrapId={ "page-wrap" } />
        <main id="page-wrap">
          <Link to="/create-event">Create Event</Link>
          <Link to="/events">Events</Link>
          <Link to="/logout" onClick={signOut}>Logout</Link>
          <a onClick={ this.showSettings } className="menu-item--small" href="">Settings</a>
        </main>
      </Menu>
    );
  }
}