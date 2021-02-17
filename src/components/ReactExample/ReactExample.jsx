import './ReactExample.css';
import React from 'react';
import StarMatchGame from '../StarMatch/StarMatchGame.jsx';
import GitHubCards from '../GitHubCards/GitHubCards.jsx';

/**
 * React Example
 * @class
 */
class ReactExample extends React.Component {
    /**
     * Constructs the component.
     * @param {object} props - The collection of properties.
     */
    constructor(props) {
        super(props);

        // Construct any additional props.
        this.state = {
            message: props.message,
        };
    }

    /**
     * Called when the component is rendered.
     */
    componentDidMount() {
        console.log("React Example Component Loaded")
    }

    /**
     * Called before the component is destroyed.
     */
    componentWillUnmount() {
        console.log("React Example Component Unloading")
    }


    /**
     * Renders the component.
     * @returns {object} The component template.
     */
    render() {
        return (
            <div className="ReactExample">
                <h3>{this.state.message}</h3>
                <br />
                <hr />
                <p>The <b>StarMatchGame</b> component is embedded below:</p>
                <hr />
                <StarMatchGame secondsAllowed={15} />
                <hr />
                <br />
                <hr />
                <p>The <b>GitHubCards</b> component is embedded below:</p>
                <hr />
                <GitHubCards />
                <hr />
            </div>
        );
    }
}

export default ReactExample;