function scoreStore() {
    this.getScore = function(){
        return JSON.parse(localStorage.getItem('scores'))
    }

    this.setScore = function(selectedScore) {
        localStorage.setItem('scores', JSON.stringify(selectedScore));
    }
}