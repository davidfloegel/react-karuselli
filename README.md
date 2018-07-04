# React Karuselli [ˈkɑruse̞lːi]

> A simple, responsive and customisable carousel component

[![CircleCI](https://circleci.com/gh/davidfloegel/react-karuselli.svg?style=svg)](https://circleci.com/gh/davidfloegel/react-karuselli)

## Todos

- [ ] Write Tests
- [ ] Create Demo Page
- [ ] Cross-Browser Testing

## Inspiration & Goals

The main reason for writing this component library was to have a carousel library that fits
the needs of what we currently need in [Muso](https://www.gomuso.io) - a side project I've been working on for years. We needed a carousel that showed a few cards (i.e. 3) at a time with a sneak peak of the next one (4th, off screen) if more are available. Kinda the experience you know from mobile app carousels. It had to be responsive and customisable without much hassle.

One thing that was required by Muso's new design was to be able to move the arrow buttons to different positions which I haven't seen in any carousel component available on npm.

I couldn't really find one that fit my needs or that was easy to use so I decided to write my own.

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
    <Karuselli.LeftArrow component={<button>Backward</button>} />
    <Karuselli.RightArrow component={<button>Forward</button>} />

    <Karuselli.Items>
      <Item />
      <Item />
      <Item />
      <Item />
      <Item />
    </Karuselli.Items>
  </Karuselli>
)
```

The usage is fairly simple. The whole carousel gets wrapped into the `Karuselli` component.
Within that you have access to `Karuselli.LeftArrow` and `Karuselli.RightArrow`. You have to define your own button within that which will automatically be disabled and get an `onClick` handler attached to it.

It is important to note that is *not* required to define the width of your items. Karuselli will automatically calculate the size based on the width of the carousel and the `spaceBetween` prop (see below).


## Arrows

In order to display arrows you'll have to define both backwards and forwards button yourself and pass them
as component into `Karuselli.LeftArrow` and `Karuselli.RightArrow`.

This gives you 100% flexibility to style and position the buttons however you want them.

```js
<Karuselli.LeftArrow component={<button><i className="fa fa-arrow-left" /></button>}>
<Karuselli.RightArrow component={<button><i className="fa fa-arrow-right" /></button>}>
```


## Karuselli.Items

Make sure you wrap your actual cards within the `Karuselli.Items` wrapper. This - again - is to give you
full control over where you want to display your cards.

```js
<Karuselli.Items>
  <Card />
  <Card />
  <Card />
  <Card />
</Karuselli.Items>
```


## PropType Definition

| PropType     | Type          | Default                        | Description                                                                                                                                                                  |
|--------------|---------------|--------------------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| width        | Number        | null                           | Optional width of the carousel. This can be used if you don't want it to stretch to a 100% within your div.                                                                  |
| spaceBetween | Number        | 30                             | The distance between the items in the carousel.                                                                                                                              |
| teaseNext    | Boolean       | true                           | Whether to show a little bit of the first card that's off screen (known behaviour from apps, especially iOS app store)                                                       |
| speed        | slow|default|fast       | default              | How fast do you want the carousel items to scroll? |
| scrollItems  | Number        | 1                              | How many items should scroll when clicking the arrow buttons. Defaults to one card at a time.                                                                                |
| visibleItems | Number/Object | ```{ xs: 1, sm: 2, md: 3, lg: 4 }``` | The number of items you want to display on each screen size. You can pass just a number (i.e. 3) which will adapt to all screen sizes. However I'd recommend being explicit. |
| scrollWithArrowKeys | Boolean | false                         | Allow user to navigate through the carousel with the left and right arrow keys. |


## Running Demos & Tests

To run the demo, simply clone this repo and run `yarn start`. This should fire up a dev server
and take you to the demos :)

## Contribution

I'm happy for every contribution to this project, may it be new features, bug fixes or code improvements. Here's a few guide lines:

- If you want to contribute, create a branch (such as fix/what-is-fixed or improve/what-is-improved or feature/name) from dev and create a PR.
- Please add tests. If it's not a small change I won't accept your PR without tests.
- Make sure the CircleCI integration passes (currently yarn lint and yarn test)
- Write a meaningful commit message. No one wants to see wip - forgive me for doing it myself!

## License

Copyright (c) 2018 - present, David Floegel
