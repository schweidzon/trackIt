import React from 'react';
import {DayPicker} from 'react-day-picker';

class MyCalendar extends React.Component {
  state = {
    selectedDay: null,
  };

  handleDayClick = (day, { selected }) => {
    this.setState({
      selectedDay: selected ? undefined : day,
    });
  };

  render() {
    return (
      <DayPicker
        selectedDays={this.state.selectedDay}
        onDayClick={this.handleDayClick}
      />
    );
  }
}

export default MyCalendar;
