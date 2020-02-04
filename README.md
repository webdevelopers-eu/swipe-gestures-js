# jquery-dna-gestures
Simple swipeleft, swiperight, swipeup, swipedown event support that does not get confused by scroll, drag, select events. Include javascript and start listening to events on any element. Just 800 bytes long!

Simple support for swipeleft, swiperight, swipeup, swipedown events.

It fires swipeleft-N, swiperight-N, swipeup-N, swipedown-N where "N" is number of swipe fingers in case there is more then one. E.g. "swipeleft" event for one-finger swipe "swipeleft-2" event for two-finger swipe etc.

Example: $('#myBox').on('swipeleft swiperight', closeBox);

Features: Small, simple, does not get confused with dragging/scrolling/selecting text, not well tested.
