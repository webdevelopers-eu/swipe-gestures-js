/**
 * Simple support for swipeleft, swiperight, swipeup, swipedown events.
 *
 * It fires swipeleft-N, swiperight-N, swipeup-N, swipedown-N where "N" is number
 * of swipe fingers in case there is more then one. E.g. "swipeleft" event for one-finger swipe
 * "swipeleft-2" event for two-finger swipe etc.
 *
 * Example: element.addEventListener('swipeleft', closeBox);
 *
 * Features: Small, simple, does not get confused with dragging/scrolling/selecting text, not well tested.
 *
 * @module     DNA Gestures
 * @author     Daniel Sevcik <sevcik@webdevelopers.cz>
 * @copyright  2020 Daniel Sevcik
 * @since      2020-02-04 22:31:22 UTC
 * @access     public
 * @license    MIT
 */
(function() {
    var evFirst = null;
    var scrollers = [];

    document.addEventListener('touchstart', function(ev) {
        cancel(ev);
        evFirst = ev;
        var target = ev.target;
        while (target) {
            scrollers.push(target);
            target.addEventListener('scroll', cancel);
            target = target.parentElement;
        }
    });

    document.addEventListener('touchcancel', cancel);
    document.addEventListener('dragstart', cancel);
    document.addEventListener('select', cancel);
    
    document.addEventListener('touchend', resolve);

    function resolve(evEnd) {
        var evStart = evFirst;
        cancel(evEnd);
        if (!evStart || !evStart.target) return;

        var diffX = evEnd.changedTouches[0].clientX - evStart.touches[0].clientX;
        var diffY = evEnd.changedTouches[0].clientY - evStart.touches[0].clientY;
        var name = null;

        if (Math.abs(diffX) > 32 && Math.abs(diffX) * 0.8 > Math.abs(diffY)) { // Horizontal
            name = diffX > 0 ? 'swiperight' : 'swipeleft';
        } else if (Math.abs(diffY) > 32 && Math.abs(diffY) * 0.8 > Math.abs(diffX)) { // Vertical
            name = diffY > 0 ? 'swipedown' : 'swipeup';
        } // else diagonal, we don't know if it is vertical or horizontal - do nothing

        if (name) {
            const evName = name + (evStart.touches.length > 1 ? evStart.touches.length : '');
            evStart.target.dispatchEvent(new CustomEvent(evName));
        }
    }

    function cancel(ev) {
        if (!evFirst) return;
        evFirst = null;
        scrollers.forEach(function(target) {
            target.removeEventListener('scroll', cancel);
        });
        scrollers = [];
    }
})();
