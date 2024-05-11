$(document).ready(function() {
    $('#calculate').click(function() {
        var months = parseInt($('#months').val());
        var costPerMonth = 10; 
        var totalCost = months * costPerMonth; 
        animateCost(0, totalCost);
    });
});

function animateCost(startValue, endValue) {
    var duration = 1000; 
    var startTime = null;

    function step(timestamp) {
        if (!startTime) startTime = timestamp;
        var elapsed = timestamp - startTime;
        var progress = Math.min(elapsed / duration, 1);
        var value = Math.floor(progress * (endValue - startValue) + startValue);

        $('#total-cost').text('$' + value);

        if (progress < 1) {
            requestAnimationFrame(step);
        }
    }

    requestAnimationFrame(step);
}
