# React Karuselli [ˈkɑruse̞lːi]

> A simple, responsive and customisable carousel component

## Todos

- [ ] Write Tests
- [ ] Allow user to customise look & positioning of arrow buttons
- [ ] Responsiveness
- [ ] Add CircleCI
- [ ] Write Readme
- [ ] Create Docs Page
- [ ] Flexible Item Width (maybe)
- [ ] Code Cleanup
- [ ] NPM Publish Process


## Inspiration & Goals

The main reason for writing this component library was to have a carousel library that fits
the needs of what we currently need in [Muso](https://www.gomuso.io) - a side project I've been working on for years. We needed a carousel that showed a few cards (i.e. 3) at a time with a sneak peak of the next one (4th, off screen) if more are available. Kinda the experience you know from mobile app carousels. It had to be responsive and customisable without much hassle.

One thing that was required by Muso's new design was to be able to move the arrow buttons to different positions which I haven't seen in any carousel component available on npm.

I couldn't really find one that fit my needs or that was easy to use so I decided to write my own.

The main inspiration comes from the [Airbnb](https://www.airbnb.com) carousel which had a nice feel to it and worked well responsive.

## Installation

```
npm save react-karuselli
or
yarn add react-karuselli
```

## Usage


```js
import Karuselli from 'react-karuselli'

export default () => (
  <Karuselli>
    <Karuselli.LeftArrow><button>Backward</button></Karuselli.LeftArrow>
    <Karuselli.RightArrow><button>Forward</button></Karuselli.RightArrow>

    <Karuselli.Scrollable>
      <Item />
      <Item />
      <Item />
      <Item />
      <Item />
    </Karuselli.Scrollable>
  </Karuselli>
)
```

The usage is fairly simple. The whole carousel gets wrapped into the `Karuselli` component.
Within that you have access to `Karuselli.LeftArrow` and `Karuselli.RightArrow`. You have to define your own button within that which will automatically be disabled and get an `onClick` handler attached to it.

It is important to note that is *not* required to define the width of your items. Karuselli will automatically calculate the size based on the width of the carousel and the `spaceBetween` prop (see below).

## PropType Definition

| PropType     | Type          | Default                        | Description                                                                                                                                                                  |
|--------------|---------------|--------------------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| width        | Number        | null                           | Optional width of the carousel. This can be used if you don't want it to stretch to a 100% within your div.                                                                  |
| spaceBetween | Number        | 30                             | The distance between the items in the carousel.                                                                                                                              |
| teaseNext    | Boolean       | true                           | Whether to show a little bit of the first card that's off screen (known behaviour from apps, especially iOS app store)                                                       |
| scrollItems  | Number        | 1                              | How many items should scroll when clicking the arrow buttons. Defaults to one card at a time.                                                                                |
| visibleItems | Number|Object | { xs: 1, sm: 2, md: 3, lg: 4 } | The number of items you want to display on each screen size. You can pass just a number (i.e. 3) which will adapt to all screen sizes. However I'd recommend being explicit. |
