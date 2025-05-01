# Vizzuality frontend challenge: City bike networks

React SPA visualizing global city bike networks.

## Demo

https://vizzuality-bicycle-map.vercel.app/

## Features

_[TBD]_

## Stack

- Next.js with the App router.
- Typescript.
- Tailwind CSS.
- Shadcn/ui.

## Getting started

```bash
npm install
npm run dev
```

open [http://localhost:3000](http://localhost:3000).

## TODO

### Main view

- [ ] There is a list of all the bicycle networks and for each of them
  - [x] Name.
  - [ ] Location (city and country).
  - [ ] Companies operating the network (can be multiple).
  - [x] Link to access the detail view.
  - [ ] Handle network fetch errors on RSC
- [x] There is a map showing all the bicycle networks.
  - [ ] Clicking on a network opens the detail view.
- [ ] There is a country filter that affects both the list and the map:
  - [x] Only one country can be selected at once.
  - [x] The selected option is stored in the URL (e.g. ?country=FR).
  - [x] When reloading the page, the filter is still applied.
  - [ ] Style as in Figma
- [ ] There is a search input that affects both the list and the map:
  - [ ] The search is performed against the name of the networks and name of the operating companies.
  - [ ] The keyword is stored in the URL (e.g. ?search=velib).
  - [ ] When reloading the page, the filter is still applied.
- [ ] BONUS: There is a way to centre and zoom the map around the user's location
- [ ] BONUS: The list of networks is paginated

### Detail view

- [x] The detail view must be accessible by URL.
- [ ] There is general information about the bicycle network:
  - [x] Name.
  - [ ] Name of the companies operating the network (can be multiple).
  - [ ] Location (city and country).
- [ ] There is a list of all the bicycle stations belonging to the network:
  - [x] Name.
  - [ ] Number of free bikes.
  - [ ] Number of empty slots.
- [x] There is a button to go back to the main view.
  - [ ] Should be styled properly
- [ ] There is a map showing all the bicycle stations.
- [ ] Clicking on a station on the map opens a tooltip:
  - [ ] Name.
  - [ ] Number of free bikes.
  - [ ] Number of empty slots.
- [ ] BONUS: The list of bicycle stations is paginated
- [ ] BONUS: The list of bicycle stations can be sorted by free bikes and empty slots (ascending and descending).
