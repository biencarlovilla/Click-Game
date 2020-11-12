import React, { Component } from "react";
import "./App.css";
import Wrapper from "./components/Wrapper";
import Container from "./components/Container";
import Nav from "./components/Nav";
import Title from "./components/Title";
import Row from "./components/Row";
import Column from "./components/Column";
import char from "./characters.json";
import CharacterCards from "./components/CharacterCards";

function shufflechar(array) {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

class App extends Component {

  state = {
    char,
    score: 0,
    topScore: 0,
    rightWrong: "",
    clicked: [],
  };

  handleClick = id => {
    if (this.state.clicked.indexOf(id) === -1) {
      this.handleIncrement();
      this.setState({ clicked: this.state.clicked.concat(id) });
    } else {
      this.handleReset();
    }
  };

  handleIncrement = () => {
    const newScore = this.state.score + 1;
    this.setState({
      score: newScore,
      rightWrong: ""
    });
    if (newScore >= this.state.topScore) {
      this.setState({ topScore: newScore });
    }
    else if (newScore === 12) {
      this.setState({ rightWrong: "You Got It!" });
    }
    this.handleShuffle();

    
  };

  handleReset = () => {
    this.setState({
      score: 0,
      topScore: this.state.topScore,
      rightWrong: "Try Again!",
      clicked: []
    });
    this.handleShuffle();
  };

  handleShuffle = () => {
    let shuffledchar = shufflechar(char);
    this.setState({ char: shuffledchar });
  };

  render() {
    return (
      <Wrapper>
        <Nav
          title="The Office"
          score={this.state.score}
          topScore={this.state.topScore}
          rightWrong={this.state.rightWrong}
        />

        <Title>
        The Office characters clicky game. hint: Do not click on the same character twice
        </Title>

        <Container>
          <Row>
            {this.state.char.map(show => (
              <Column size="md-3 sm-6">
                <CharacterCards
                  key={show.id}
                  handleClick={this.handleClick}
                  handleIncrement={this.handleIncrement}
                  handleReset={this.handleReset}
                  handleShuffle={this.handleShuffle}
                  id={show.id}
                  image={show.image}
                />
              </Column>
            ))}
          </Row>
        </Container>
      </Wrapper>
    );
  }
}

export default App;