# jquery-dna-gestures

Adds support for swipe DOM events to your browser.
* `swipeleft`
* `swiperight`
* `swipeup`
* `swipedown`

## Highlights

* Scroll/drag/select events will never be confused with swipe gestures. 
* Just 800 bytes long!
* Support for multi-finger swipes. E.g. two finger swipes fire events `swiepleft-2`, `swiperight-2` and so on. 

Example: 
``` 
$('#myBox').on('swipeleft swiperight', closeBox);
```

You can see it in action on https://www.cyrex.tech
