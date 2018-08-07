# kwin-ministack

A stack for minimized windows for kwin

## Fork

This is my modified version of kwin-ministack with additional (semi-related) functionality. The script provides the following hotkeys:

- **Meta+,**: Unminimize last minimized window
- **Meta+.**: Unminimize all minimized windows
- **Meta+W**: Minimize all clients in screen but the selected one
- **Meta+E**: Swap currently selected window with one of the minimized window (cycles through all windows)

In order to make this script more user-friendly for multi-monitor setups, make sure the option "Separate screen focus" under *System Settings* -> *Window Behaviour* is activated.

Some parts of the source have also been taken from: https://github.com/karakum/kwin-script-onlyOneActiveWindow/blob/master/contents/code/main.js

