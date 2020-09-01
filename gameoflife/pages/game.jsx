import React, { Component } from "react";
import CellGrid from "../pages/game/cellGrid";
import algorithmGameOfLife from "../pages/game/algorithm";
import styles from '../styles/Home.module.css'

class Game extends Component {

    _ROWS = 25;
    _COLS = 30;
    newState = this.makeRandom2DArray(this._ROWS, this._COLS);
  
    makeRandom2DArray(rows, cols) {
      if (rows <= 0 || cols <= 0) {
        console.log("Invalid no. of rows or columns");
        return;
      }
      let arr = new Array(rows);
      for (let i = 0; i < rows; i++) {
        arr[i] = new Array(cols);
        for (let j = 0; j < cols; j++) {
          arr[i][j] = Math.floor(Math.random() * 2);
        }
      }
      return arr;
    }
  
    reset2DArray() {
      const rows = this.newState.length;
      const cols = this.newState[0].length;
      let arr = new Array(rows);
      for (let i = 0; i < rows; i++) {
        arr[i] = new Array(cols);
        for (let j = 0; j < cols; j++) {
          arr[i][j] = 0;
        }
      }
      return arr;
    }
  
    state = {
      delay: null,
      totalTimesteps: 0,
      isRunning: 0,
      currentState: this.newState,
      buttonText: "Next",
      generations: 0,
    };
  
    delay = this.state.delay;
    totalTimesteps = this.state.totalTimesteps;
    elapsedTimesteps = this.state.elapsedTimesteps;
    isRunning = this.state.isRunning; 

    handleStop = () => {
      this.setState({
        delay: null,
        totalTimesteps: 0,
        isRunning: 0,
        statusText: "Press Start To Begin Simulation",
        buttonText: "Start"
      });
      this.delay = null;
      this.totalTimesteps = 0;
      this.elapsedTimesteps = 0;
      this.isRunning = 0;
    };
  
    handleReset = () => {
      this.newState = this.reset2DArray();
      this.setState({ currentState: this.newState });
    };
  
    getNewState = () => {
      console.log(
        this.delay,
        this.totalTimesteps,
        this.elapsedTimesteps,
        this.isRunning
      );
      if (this.elapsedTimesteps < this.totalTimesteps && this.isRunning) {
        // console.log("Algorithm called");
        // const t0 = performance.now();
        this.newState = algorithmGameOfLife(this.newState);
        // const t1 = performance.now();
        // console.log(`Took ${t1 - t0} ms`)
        this.setState({ currentState: this.newState });
        this.elapsedTimesteps++;
        setTimeout(() => {
          this.getNewState();
        }, this.delay * 1000);
      } else {
        this.handleStop();
      }
    };

    // constructor(props){
    //   super(props);
    //   this.state = { 
    //     hardCodedDelay: 0.25,
    //     hardCodedTimesteps: 0,
    //     generations: 0,
    //   };
    // }
  
    render() {
      return (
        <nav className={styles.navbar} id="navbar">
          <h1><a className={styles.subtitle} 
          // className="navbar-brand" 
          href="./">
            Game Of Life
          </a></h1>
          <div className="form-inline my-2 my-lg-0" id="navbar-main">
            {/* <button
              onClick={() => {
                this.onStop();
                this.props.onReset();
              }}
              className="btn btn-secondary my-2 my-sm-0"
            >
              Clear Grid
            </button> */}
            <span className="nav-item nav-link m-2 delay">Delay:</span>
            <input
              name="delay"
              id="delay"
              type="number"
              ref={(delay) => (this.variableDelay = delay)}
              // ref={(delay) => (this.hardCodedDelay = delay)}
              className="delay form-control mr-sm-2"
              placeholder="Delay (in sec)"
            />
            <span className="nav-item nav-link m-2">
              {/* No. of Timesteps: */}
            </span>
            <input
              name="timesteps"
              id="delay"
              type="number"
              // ref={(timesteps) => (this.variableTimesteps = timesteps)}
              ref={(timesteps) => (this.hardCodedTimesteps = timesteps)}
              className="form-control mr-sm-2"
              placeholder="No. of Timesteps"
              defaultValue="1"
            />
            <button
              onClick={this.handleClick}
              className="btn btn-primary my-2 my-sm-0"
            >
              {/* {this.props.buttonText} */}
              Next Generation
            </button>
          </div>
          <p className=" m-2">Generations: {this.state.generations}</p>
          <div className="buttonArray-center grid">
          <CellGrid
            isRunning={this.state.isRunning}
            currentState={this.state.currentState}
            // currentState={this.currentState}
            onButtonClick={this.handleButtonClick}
          />
        </div> 
        </nav>
      );
    }
  
    handleClick = () => {
      if (this.props.buttonText === "Next") {
        this.props.onStop();
        } else if (!this.validateClickState()) {
          this.props.onStatusChange(
            "Delay should be atleast zero and Timesteps should be atleast one",
            "Next"
          );
        } else {
        this.props.onStart(
          this.hardCodedDelay.valueAsNumber,
          this.hardCodedTimesteps.valueAsNumber
        );
      }
    };
  
    validateClickState() {
      if (
        // this.hardCodedDelay.valueAsNumber >= 0 &&
        this.hardCodedTimesteps.valueAsNumber > 0
      )
        return true;
    }
  
    updateCount() {
      this.setState({ count: this.state.generations + 1 })
    }

    handleStatusChange = (statusText, buttonText) => {
        this.setState({
          statusText: statusText,
          buttonText: buttonText
        });
      };
    
      handleButtonClick = (row, col) => {
        if (this.state.isRunning) return;
        let currentState = [];
        for (let i = 0; i < this.state.currentState.length; i++) {
          currentState[i] = [...this.state.currentState[i]];
        }
        currentState[row][col] = (currentState[row][col] + 1) % 2;
        this.newState = currentState;
        this.setState({ currentState: currentState });
      };
    
      handleStart = (delay, totalTimesteps) => {
        this.setState({
          delay: delay,
          totalTimesteps: totalTimesteps,
          isRunning: 1,
          statusText: "Simulation Started",
          buttonText: "Stop"
        });
        this.delay = delay;
        this.totalTimesteps = totalTimesteps;
        this.elapsedTimesteps = 0;
        this.isRunning = 1;
        this.getNewState();
      };
    
      handleStop = () => {
        this.setState({
          delay: null,
          totalTimesteps: 0,
          isRunning: 0,
          statusText: "Press Start To Begin Simulation",
          buttonText: "Start"
        });
        this.delay = null;
        this.totalTimesteps = 0;
        this.elapsedTimesteps = 0;
        this.isRunning = 0;
      };
    
      handleReset = () => {
        this.newState = this.reset2DArray();
        this.setState({ currentState: this.newState });
      };
    
      getNewState = () => {
        console.log(
          this.delay,
          this.totalTimesteps,
          this.elapsedTimesteps,
          this.isRunning
        );
        if (this.elapsedTimesteps < this.totalTimesteps && this.isRunning) {
          this.newState = algorithmGameOfLife(this.newState);
          this.setState({ currentState: this.newState });
          this.elapsedTimesteps++;
          setTimeout(() => {
            this.getNewState();
          }, this.delay * 1000);
        } else {
          this.handleStop();
        }
      };
}

export default Game;