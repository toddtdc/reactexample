// GitHub Cards example is from the following React course: https://app.pluralsight.com/library/courses/react-js-getting-started/table-of-contents
// Source for original example: https://jscomplete.com/playground/rgs2.7
// Note the original source used in-line events for handleSubmit and addNewProfile that were changed from arrow functions 
// which do not compile in our environment to methods that are bound to the current context in the constructors.
//
// To test use your own or the following GitHub usernames to run the example: gaearon, sophiebits, sebmarkbage, bvaughn.
import './GitHubCards.css';
import React from 'react';

const CardList = (props) => (
    <div>
        {props.profiles.map(profile => <Card key={profile.id} {...profile} />)}
    </div>
);

class Card extends React.Component {
    // eslint-disable-next-line no-useless-constructor
    constructor(props) {
        super(props);
    }

    render() {
        const profile = this.props;
        return (
            <div className="github-profile">
                <img alt='Profile pitcture' src={profile.avatar_url} />
                <div className="info">
                    <div className="name">{profile.name}</div>
                    <div className="company">{profile.company}</div>
                </div>
            </div>
        );
    }
}

class Form extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userName: '',
        };
        this.handleSubmit = this.handleSubmit.bind(this);
    }
   
    async handleSubmit (event) {
        // Test form submit not to do default handling
        event.preventDefault();
        
        // Call GitHub API to retrieve user info        
        await fetch("https://api.github.com/users/" + this.state.userName, {
            method: "GET",
            cache: 'no-cache',
            referrerPolicy: "no-referrer",
            headers: {    
                accept: 'application/json'
            }        
        })
        .then(response => {
            if (response.status !== 200) {
                throw new Error("Bad Response: " + response.status);
            }
            return response.json();
        })
        .then(data => {
            // Process the response if one was received
            this.props.onSubmit(data);
        })
        .catch((error) => {
            // Log error finding on user GitHub
            console.log("Error reading from GitHub - " + error.message);
        });

        // Clear the last user name entered
        this.setState({ userName: '' });
    };

    render() {
        return (
            <form onSubmit={event => this.handleSubmit(event)}>
                <input
                    type="text"
                    value={this.state.userName}
                    onChange={event => this.setState({ userName: event.target.value })}
                    placeholder="GitHub username"
                    required
                />
                <button>Add card</button>
            </form>
        );
    }
}

class GitHubCards extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            profiles: [],
        };
        this.addNewProfile = this.addNewProfile.bind(this);
    }

    addNewProfile(profileData) {
        if (profileData) {
            if (!profileData.name) {
                profileData.name = "User Name: " + profileData.login;
            }
            this.setState(prevState => ({
                profiles: [...prevState.profiles.filter(item => item.login !== profileData.login), profileData],
            }));
        }
    };

    render() {
        return (
            <div className="github-panel">
                <div className="header">{this.props.title}</div>
                <Form onSubmit={this.addNewProfile} />
                <CardList profiles={this.state.profiles} />
            </div>
        );
    }
}

export default GitHubCards;