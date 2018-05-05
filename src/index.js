import React from "react";
import { render } from "react-dom";
import { Provider, connect } from "react-redux";
import { createStore } from "redux";

/*
Main STATE structure
const state = {count: 0};
*/

//STEP 1 - Create REDUCER and returns the new state object
const userReducer = (state, action) => {
    state === undefined ? (state = { count: 0 }) : null; //Definition for beginning state value and its structure

    switch (action.type) {
        case "INCREMENT":
            return Object.assign({}, state, { count: state.count + 1 }); //Using non-mutating method
        case "DECREMENT":
            return Object.assign({}, state, { count: state.count - 1 });
        default:
            return state;
    }
};

//STEP 2 - Create STORE
const store = createStore(userReducer); //Redux method

//STEP 3 - Create MAIN CLASS and its methods with using dispatch(action)
class Counter extends React.Component {
    render() {
        return (
            <div>
                <h2>Simple React-Redux example - Counter (Part 2)</h2>
                <div>
                    <button onClick={this.props.actionDecrease}>-</button>
                    <span>{this.props.count}</span>
                    <button onClick={this.props.actionIncrease}>+</button>
                </div>
                <div>
                    <p>
                        Everything in one place for it becomes easier to
                        understand about how Redux state and React component's
                        props communicate with each other.
                    </p>
                    <p>Using mapStateToProps and mapDispatchToProps</p>
                </div>
            </div>
        );
    }
}

//STEP 3a - Create ACTIONS
const actionIncrease = () => ({ type: "INCREMENT" }); //returns an action object for dispatch()
const actionDecrease = () => ({ type: "DECREMENT" });

//STEP 3b - Using for mapping
const mapStateToProps = state => {
    return {
        count: state.count
    };
};
//Using actions here
const mapDispatchToProps = {
    actionIncrease,
    actionDecrease
};

/*
STEP 3c
Create mapping from Redux state to React component's props
- Redux sate: const state = {count: 0};
- React component's props: this.props.count
*/
const CounterX = connect(mapStateToProps, mapDispatchToProps)(Counter);

//STEP 4 - Create main React component with Redux store
const App = () => (
    <Provider store={store}>
        <CounterX />
    </Provider>
);

//RENDER your app
render(<App />, document.getElementById("app"));