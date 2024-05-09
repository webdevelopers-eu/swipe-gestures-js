# Swipe Gestures

Adds support for swipe DOM events to your browser.
* `swipeleft`
* `swiperight`
* `swipeup`
* `swipedown`
* `swipeleft-N`
* `swiperight-N`
* `swipeup-N`
* `swipedown-N`

Where `N` is number of swiping fingers starting from 2. E.g. `swipeleft-3` Event represents three-finger swipe left.

## Highlights

* Scroll/drag/select events will never be confused with swipe gestures. 
* Just 800 bytes long!
* Support for multi-finger swipes. E.g. two finger swipes fire events `swiepleft-2`, `swiperight-2` and so on. 

Example: 
```
// With jQuery
$('#myBox').on('swipeleft swiperight', closeBox);

// Two-finger swipe - without jQuery
element.addEventListener('swipeleft-2', moveLeft);
element.addEventListener('swiperight-2', moveRight);
```

## Usage
Just include the script on the page and start listening to swipe events anywhere.
