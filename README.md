# tabview
**A Scrollable tabs with close buttons**
> This is a tabs implementation using vanilla Javascript. The Tabview object is a singleton which should be called to create Tabs as required.  
## Quick start
``` javascript
  import Tabview from 'tabview'
  cont el = document.getElementById('tab-container')
  const options = {
    theme: 'dark'
  }
  var view = Tabview.createTabs(el, options)
  var tab = view.add({ name: 'Tab1', title: 'The first Tab', label: 'First Tab' })
  view.destroy()
```
## Geting started
### Installation
``` javascript
  npm install 'tabview 
```
> Import into your modules
```javascript
   import Tabview from 'tabview'
```
### Initialization
> Initialize with or without options
```javascript
    const view = Tabview.createTabs('tab-container', options)
    const tab = view.add(options)
``` 
## API
#### The Tabview public API:
* createTabs(containerId, options) - creates tabs object and returns it
* randomId() - generates a random string identifier
* Emitter() - Event emitter
* Events() - Custom Event
#### Tabs methods:
* add(options) - adds a tab to the tabs and returns the new tab
* close(tabId) - close the tab with given id
* select(tabId) - select tab with given id
* destroy() - destroy the tabs object
#### The Tabs Events
* onClose - Trigger when  a tab closed
* onSelect - Trigger when a tab is selected
* onDestroy - Trigger when tabs is destroyed
 

  


