function scoreStore() {
    this.getScore = function () {
        return JSON.parse(localStorage.getItem('scores'))
    }

    this.getScores = function () {
        const choices = JSON.parse(localStorage.getItem('scores'))['choices'];
        const sessionNumber = JSON.parse(localStorage.getItem('sessionNumber'));
        return { choices, sessionNumber };
    }

    this.setScore = function(selectedScore) {
        localStorage.setItem('scores', JSON.stringify(selectedScore));
    }

    this.clearScore = function() {
        localStorage.clear('scores');
    }
}