# Vizzuality frontend challenge: City bike networks

React SPA visualizing global city bike networks.

## Demo

https://vizzuality-bicycle-map.vercel.app/

## Features

_[TBD]_

## Stack

- [Next.js](https://nextjs.org/) with the [App router](https://nextjs.org/docs/app).
- [TypeScript](https://www.typescriptlang.org/).
- [Tailwind CSS](https://tailwindcss.com/).
- [Shadcn/ui](https://ui.shadcn.com/).
- [React Mapbox GL](https://visgl.github.io/react-map-gl).
- [nuqs](https://nuqs.47ng.com/) — for URL params handling.

## Getting started

```bash
npm install
npm run dev
```

open [http://localhost:3000](http://localhost:3000).

## TODO

### Main view

- [x] There is a list of all the bicycle networks and for each of them
  - [x] Name.
  - [x] Location (city and country).
  - [x] Companies operating the network (can be multiple).
  - [x] Link to access the detail view.
  - [x] Handle network fetch errors on RSC
  - [x] Style as in Figma
  - [ ] Sticky search bar when scrolling
  - [ ] Show companies behind the +N company badge
  - [ ] Show gradient overlay above the list
- [x] There is a map showing all the bicycle networks.
  - [x] Clicking on a network opens the detail view.
  - [x] Style network marker as in Figma
  - [x] Zoom to bounding box of networks
- [x] There is a country filter that affects both the list and the map:
  - [x] Only one country can be selected at once.
  - [x] The selected option is stored in the URL (e.g. ?country=FR).
  - [x] When reloading the page, the filter is still applied.
  - [x] Style as in Figma
  - [x] Search by name in the country dropdown
  - [x] List only countries with bicycle networks
  - [x] Show selected country in the dropdown
  - [x] Allow to unselect country
- [x] There is a search input that affects both the list and the map:
  - [x] The search is performed against the name of the networks and name of the operating companies.
  - [x] The keyword is stored in the URL (e.g. ?search=velib).
  - [x] When reloading the page, the filter is still applied.
  - [x] Style as in Figma
  - [ ] Debounce when typing
  - [ ] BONUS: Highlight search terms
- [ ] BONUS: There is a way to centre and zoom the map around the user's location
- [ ] BONUS: The list of networks is paginated

### Detail view

- [x] The detail view must be accessible by URL.
- [x] There is general information about the bicycle network:
  - [x] Name.
  - [x] Name of the companies operating the network (can be multiple).
  - [x] Location (city and country).
- [x] There is a list of all the bicycle stations belonging to the network:
  - [x] Name.
  - [x] Number of free bikes.
  - [x] Number of empty slots.
- [x] There is a button to go back to the main view.
  - [x] Should be styled properly
  - [ ] Should use navigator back, rather than root path
- [x] There is a map showing all the bicycle stations.
  - [x] Auto-zoom to bounding box to fit all stations
- [x] Clicking on a station on the map opens a tooltip:
  - [x] Name.
  - [x] Number of free bikes.
  - [x] Number of empty slots.
  - [x] Style as in Figma
- [ ] BONUS: The list of bicycle stations is paginated
- [ ] BONUS: The list of bicycle stations can be sorted by free bikes and empty slots (ascending and descending).
