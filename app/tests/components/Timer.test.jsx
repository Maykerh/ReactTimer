var React = require('react');
var ReactDom = require('react-dom');
var expect = require('expect');
var $ = require('jQuery');
var TestUtils = require('react-addons-test-utils');
var Timer = require('Timer');

describe('Timer', () => {
	it('Should exist', () => {
		expect(Timer).toExist();
	});

	describe('handleStatusChange', () => {
		it('should set state to started and count', (done) => {
			var timer = TestUtils.renderIntoDocument( <Timer/> );
			timer.handleStatusChange('started');

			expect(timer.state.count).toBe(0);

			setTimeout(() => {
				expect(timer.state.count).toBe(1);
				done();
			}, 1001);
		});

		it('should pause timer on pause status', (done) => {
			var timer = TestUtils.renderIntoDocument( <Timer/> );
			timer.handleStatusChange('started');

			timer.setState({count: 10});
			timer.handleStatusChange('paused');
			
			setTimeout(() => {
				expect(timer.state.count).toBe(10);
				expect(timer.state.timerStatus).toBe('paused');
				done();
			}, 1001);
		});

		
		it('should clear count on stopped status', (done) => {
			var timer = TestUtils.renderIntoDocument( <Timer/> );
			timer.handleStatusChange('started');

			timer.setState({count: 10});
			timer.handleStatusChange('stopped');
			
			setTimeout(() => {
				expect(timer.state.count).toBe(0);
				expect(timer.state.timerStatus).toBe('stopped');
				done();
			}, 1001);
		});
	});
});