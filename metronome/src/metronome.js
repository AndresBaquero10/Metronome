import React, { Component } from "react";
import styled from "styled-components";
import click1 from "./Assets/click1.wav";
import click2 from "./Assets/click2.wav";
class Metronome extends Component {
  constructor(props) {
    super(props);
    this.click1 = new Audio(click1);
    this.click2 = new Audio(click2);
    this.state = { playing: false, count: 0, bpm: 60, beatsPerMeasure: 4 };
  }

  handleSpeedInput = (e) => {
    const bpm = e.target.value;

    if (this.state.playing) {
      clearInterval(this.timer);
      this.timer = setInterval(this.playClick, (60 / bpm) * 1000);
      this.setState({
        count: 0,
        bpm,
      });
    } else {
      this.setState({ bpm });
    }
  };
  startStop = () => {
    if (this.state.playing) {
      clearInterval(this.timer);
      this.setState({ playing: false });
    } else {
      this.timer = setInterval(this.playClick, (60 / this.state.bpm) * 1000);
      this.setState({ playing: true, count: 0 });
    }
  };

  playClick = () => {
    const { count, beatsPerMeasure } = this.state;

    if (count % beatsPerMeasure === 0) {
      this.click2.play();
    } else {
      this.click1.play();
    }

    this.setState({
      count: count + 1,
    });
  };

  render() {
    const { playing, bpm } = this.state;
    return (
      <MetronomeDiv>
        <h1>Metronome</h1>
        <BpmSliderContainer>
          <BpmShowSpeedDiv>
            <BpmShowSpeedSpan>{bpm} BPM </BpmShowSpeedSpan>
            <BpmSpeedInput
              onChange={(e) => this.handleSpeedInput(e)}
            ></BpmSpeedInput>
          </BpmShowSpeedDiv>
        </BpmSliderContainer>
        <StartButton onClick={this.startStop}>
          {playing ? "Stop" : "Start"}
        </StartButton>
      </MetronomeDiv>
    );
  }
}

export default Metronome;

const MetronomeDiv = styled.div`
  border: 2px dashed #c94d46;
  padding-left: 150px;
  margin: 20% auto;
  width: 300px;
  height: 200px;
  display: flex;
  flex-direction: column;
`;

const BpmSliderContainer = styled.div`
  display: block;
  display: flex;
  width: 45%;
`;

const BpmShowSpeedDiv = styled.div`
  width: 100%;
  margin-top: 10px;
`;

const BpmSpeedInput = styled.input.attrs((props) => ({
  type: "range",
  min: 60,
  max: 240,
}))`
  width: 100%;
  margin: 10px;
`;

const BpmShowSpeedSpan = styled.span`
  display: block;
  text-align: center;
`;

const StartButton = styled.button`
  width: 100px;
  background: #c94d46;
  margin-left: 30px;
  color: #fff;
  font-size: 18px;
`;
