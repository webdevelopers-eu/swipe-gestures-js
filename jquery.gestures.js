/**
 * Simple support for swipeleft, swiperight, swipeup, swipedown events.
 *
 * It fires swipeleft-N, swiperight-N, swipeup-N, swipedown-N where "N" is number
 * of swipe fingers in case there is more then one. E.g. "swipeleft" event for one-finger swipe
 * "swipeleft-2" event for two-finger swipe etc.
 *
 * Example: $('#myBox').on('swipeleft swiperight', closeBox);
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
    var $scrollers = $();

    $(document)
	.on('touchstart.gestures', function(ev) { // Start
	    cancel(ev);
	    evFirst = ev;
	    $scrollers = $(ev.target).parents().addBack().on('scroll.gestures', cancel);
	})
	.on('touchcancel.gestures dragstart.gestures select.gestures', cancel)
	.on('touchend.gestures', resolve); // Finish

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
	} // else diagnoal, we don't know if it is vertical or horizontal - do nothing

	if (name) {
	    $(evStart.target).trigger(name + (evStart.touches.length > 1 ? evStart.touches.length : ''));
	}
    }

    function cancel(ev) {
	if (!evFirst) return;
	evFirst = null;
	$scrollers.off('scroll.gestures');
	$scrollers = $();
    }

})();
