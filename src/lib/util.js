// @flow

import _ from 'lodash'

export const DIRECTION = {
  LEFT: 'left',
  RIGHT: 'right'
}

/**
 * Definition of key codes to scroll Karuselli using keyboard
 */
export const ARROW_KEYS = {
  LEFT: 37,
  RIGHT: 39
}

/**
 * Definition of screen sizes at which we break into a different layout.
 * @type {Object}
 */
export const RESPONSIVE_THRESHOLDS = {
  sm: 768,
  md: 992,
  lg: 1200
}

export function getSpeedSteps(speed) {
  switch (speed) {
    case 'slow':
      return 5
    case 'default':
      return 12
    case 'fast':
      return 16
    default:
      return 12
  }
}

/**
 * Return the correct size string for a given window width
 * @return {String}
**/
export function determineScreenSize(): string {
  let foundSize = 'xs'

  _.forEach(RESPONSIVE_THRESHOLDS, (pixels, sizeClass) => {
    if (window.innerWidth >= pixels) {
      foundSize = sizeClass
    }
  })

  return foundSize
}

/**
 * Determine how many cards should be displayed on screen based on what the user has defined
 *
 * @param  {Number|Object} visibleItems
 * @return {Number}
 */
export function getNumberOfVisibleItems(visibleItems: Number | Object) {
  if (_.isNumber(visibleItems)) {
    return visibleItems
  }

  const sizeString = determineScreenSize(window.innerWidth)

    if (_.get(visibleItems, sizeString)) {
      return visibleItems[sizeString]
    }

    return _.get(visibleItems, _.last(_.keys(visibleItems)))
}


/**
 * Calculate how big every panel in the carousel should be based on the total width of the Karuselli
 * and the space in between the cards specified by the user.
 *
 * @param  {Number}        karuselliWidth
 * @param  {Number|Object} visibleItems
 * @param  {Number}        spaceBetween
 * @param  {Boolean}       teaseNext
 * @return {Number}
 */
export function calculateItemWidth(karuselliWidth: Number, visibleItems: Number | Object, spaceBetween: Number, teaseNext: Boolean) {
  const numOfVisibleItems = getNumberOfVisibleItems(visibleItems, window.innerWidth)
  const calcSpaceBetween = teaseNext ? numOfVisibleItems * spaceBetween : (numOfVisibleItems - 1) * spaceBetween
  return Math.round((karuselliWidth - calcSpaceBetween - (teaseNext * spaceBetween)) / numOfVisibleItems)
}

