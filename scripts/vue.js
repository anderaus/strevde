document.addEventListener("DOMContentLoaded", function (event) {

    var app = new Vue({
        el: '#vueapp',
        data: {
            tripdata: {}
        },
        mounted: function() {
            var self = this;
            fetch('testdata/' + window.tripname + '.json')
                .then(function (response) {
                    return response.json();
                })
                .then(function (trip) {
                    self.tripdata = trip;
                });
        },
        computed: {
            total_moving_time: function () {
                if (!this.tripdata.activities) return 0;
                return this.tripdata.activities.reduce(function (total, item) {
                    return total + item.moving_time
                }, 0);
            },
            total_distance: function () {
                if (!this.tripdata.activities) return 0;
                return this.tripdata.activities.reduce(function (total, item) {
                    return total + item.distance
                }, 0);
            },
            total_elevation: function () {
                if (!this.tripdata.activities) return 0;
                return this.tripdata.activities.reduce(function (total, item) {
                    return total + item.total_elevation_gain
                }, 0);
            },
            longest_moving_time: function () {
                if (!this.tripdata.activities) return 0;
                return Math.max.apply(Math, this.tripdata.activities.map(function (item) { return item.moving_time; }))
            },
            longest_distance: function () {
                if (!this.tripdata.activities) return 0;
                return Math.max.apply(Math, this.tripdata.activities.map(function (item) { return item.distance; }))
            },
            highest_elevation: function () {
                if (!this.tripdata.activities) return 0;
                return Math.max.apply(Math, this.tripdata.activities.map(function (item) { return item.total_elevation_gain; }))
            }
        }
    });


    Vue.filter('round', function (value, decimals) {
        if (!value) {
            value = 0;
        }
        if (!decimals) {
            decimals = 0;
        }
        return value.toLocaleString(undefined, { minimumFractionDigits: decimals, maximumFractionDigits: decimals });
    });

    Vue.filter('friendlytime', function (value) {
        if (!value) {
            value = 0;
        }

        var hours = Math.floor(value / 3600);
        var minutes = Math.floor((value - (hours * 3600)) / 60);
        var seconds = value - (hours * 3600) - (minutes * 60);

        // if (hours < 10) { hours = "0" + hours; }
        if (minutes < 10) { minutes = "0" + minutes; }
        if (seconds < 10) { seconds = "0" + seconds; }
        return hours + ':' + minutes + ':' + seconds;
    });
});