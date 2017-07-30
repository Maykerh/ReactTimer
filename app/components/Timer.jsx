var React = require('react');
var Clock = require('Clock');
var Controls = require('Controls');

var Timer = React.createClass({

	getInitialState: function() {
		return {
			count: 0,
			timerStatus: 'stopped'
		}
	},

	componentDidUpdate: function(prevProps, prevState) {
		var {timerStatus} = this.state;
		var prevTimerStatus = prevState.timerStatus;

		if (timerStatus !== prevTimerStatus) {
			switch ( timerStatus ) {
				case 'paused':
					clearInterval(this.timer);
					this.timer = undefined;
					break;
				case 'started':
					this.startTimer();
					break;
				case 'stopped':
					clearInterval(this.timer);
					this.timer = undefined;
					
					this.setState({
						count: 0
					});
					return;
			}
		}
	},

	componentWillUnmount: function() {
		clearInterval(this.timer);
	},

	handleStatusChange: function(newStatus) {
		this.setState({
			timerStatus: newStatus
		});
	},

	startTimer: function() {
		this.timer = setInterval(() => {
			var newCount = this.state.count + 1;

			this.setState({
				count: newCount
			})
		}, 1000);
	},

	render: function() {
		var {count, timerStatus} = this.state;

		return (
			<div>
				<h1 className='page-title'>Timer app</h1>
				<Clock totalSeconds={count}/>
				<Controls countdownStatus={timerStatus} onStatusChange={this.handleStatusChange}/>
			</div>
		);
	}
});

module.exports = Timer;